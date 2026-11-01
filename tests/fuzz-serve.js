// Property-based fuzzing for the CI static server: arbitrary request paths
// must never expose files outside the served root or produce a server error.
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const fc = require("fast-check");
const { serve } = require("./serve.js");

function request(port, rawPath) {
  return new Promise((resolve, reject) => {
    const req = http.get({ hostname: "127.0.0.1", port, path: rawPath, agent: false }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.setTimeout(2000, () => req.destroy(new Error("local fuzz request timed out")));
    req.on("error", reject);
  });
}

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hugo-mod-katex-fuzz-"));
  const root = path.join(tempDir, "public");
  const outsideSecret = "outside-root-secret";
  fs.mkdirSync(root);
  fs.writeFileSync(path.join(root, "index.html"), "public index");
  fs.writeFileSync(path.join(tempDir, "secret.txt"), outsideSecret);

  const server = await serve(root, 0);
  const port = server.address().port;
  try {
    await fc.assert(
      fc.asyncProperty(
        fc.oneof(
          fc.string({ maxLength: 128 }),
          fc.constantFrom(
            "../secret.txt",
            "../../secret.txt",
            "%2e%2e/secret.txt",
            "%2E%2E%2Fsecret.txt",
            "..%2fsecret.txt",
            "%2e%2e%5csecret.txt",
            "..\\secret.txt",
            "%00",
            "%",
          ),
        ),
        async (candidate) => {
          let response;
          try {
            response = await request(port, `/${candidate}`);
          } catch (error) {
            // Node rejects some malformed request targets before they reach the
            // server. Those inputs exercise the HTTP parser, not serve().
            if (["ERR_INVALID_CHAR", "ERR_UNESCAPED_CHAR", "ERR_UNESCAPED_CHARACTERS"].includes(error.code)) return;
            throw error;
          }

          assert.ok(
            [200, 400, 403, 404].includes(response.status),
            `unexpected HTTP ${response.status} for ${JSON.stringify(candidate)}`,
          );
          assert.notEqual(response.body, outsideSecret, `outside file exposed for ${candidate}`);
          if (response.status === 200) {
            assert.equal(response.body, "public index", `unexpected file served for ${candidate}`);
          }
        },
      ),
      { numRuns: 200 },
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main()
  .then(() => console.log("PASS: 200 fuzzed request paths stayed inside the static root"))
  .catch((error) => {
    console.error("FAIL:", error);
    process.exitCode = 1;
  });
