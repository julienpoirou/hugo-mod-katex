// Verifies, in a real headless browser, that the shortcode's runtime
// actually renders, not just that Hugo emitted the right HTML/script tags
// (which is all the shell-based CI assertions can check), and that the
// trust security default actually holds at render time, not just in the
// data-trust attribute Hugo emits.
"use strict";

const path = require("path");
const { chromium } = require("playwright");
const { serve } = require("./serve.js");

const PORT = 4173;

async function verifyTestPage(page, baseUrl) {
  await page.goto(`${baseUrl}/test/`);
  await page.waitForFunction(
    () => document.querySelectorAll('[data-hugo-mod-katex][data-rendered="true"]').length >= 6,
    { timeout: 15000 }
  );
  const katexCount = await page.locator(".katex").count();
  const errorClassCount = await page.locator(".is-error").count();
  if (katexCount < 6) {
    throw new Error(`expected at least 6 rendered .katex elements, got ${katexCount}`);
  }
  if (errorClassCount > 0) {
    throw new Error("an .is-error wrapper is present on the main test page");
  }
}

async function verifySecurityPage(page, baseUrl) {
  await page.goto(`${baseUrl}/security-test/`);
  await page.waitForFunction(
    () => document.querySelectorAll('[data-hugo-mod-katex][data-rendered="true"]').length >= 2,
    { timeout: 15000 }
  );
  const wrappers = await page.locator("[data-hugo-mod-katex]").all();
  const untrustedHtml = await wrappers[0].innerHTML();
  const trustedHtml = await wrappers[1].innerHTML();

  if (/<a\s[^>]*href="https:\/\/evil\.example/.test(untrustedHtml)) {
    throw new Error("default (trust=false) rendered a clickable href - the security fix regressed");
  }
  if (!/<a\s[^>]*href="https:\/\/evil\.example/.test(trustedHtml)) {
    throw new Error("trust=\"true\" opt-in did not render the href - the opt-in is broken");
  }
}

async function main() {
  const publicDir = process.argv[2];
  if (!publicDir) {
    console.error("usage: node verify-render.js <public-dir>");
    process.exit(1);
  }

  const server = await serve(path.resolve(publicDir), PORT);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    const failedRequests = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("requestfailed", (req) => failedRequests.push(req.url()));

    await verifyTestPage(page, `http://127.0.0.1:${PORT}`);
    await verifySecurityPage(page, `http://127.0.0.1:${PORT}`);

    if (errors.length > 0) {
      console.error("FAIL: page errors:", errors);
      process.exit(1);
    }
    if (failedRequests.length > 0) {
      console.error("FAIL: failed network requests:", failedRequests);
      process.exit(1);
    }

    console.log("PASS: katex renders (6/6 wrappers), fonts load, and trust=false/true behave correctly at render time");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error("FAIL:", error.message);
  process.exit(1);
});
