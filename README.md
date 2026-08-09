# hugo-mod-katex

[![CI](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/julienpoirou/hugo-mod-katex/badge)](https://scorecard.dev/viewer/?uri=github.com/julienpoirou/hugo-mod-katex)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-katex?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-katex/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-katex logo" width="160" height="160">
</p>

<p align="center">
  <strong>KaTeX formulas in your Hugo pages.</strong><br>
  Block and inline shortcodes, vendored fonts, <code>mhchem</code> ready out of the box.
</p>

> **Do you need this?** Recent Hugo versions render math server-side with `transform.ToMath` and passthrough render hooks, with no JavaScript and no font payload. Prefer that for plain math. Reach for this module when you want vendored offline assets, `mhchem` chemistry notation, a shortcode flow with `src`/`b64` inputs, or support for older Hugo versions.

## Requires

- Hugo >= `0.124`. The extended edition is not required.

## Install

**Binary** - Hugo and Go installed locally:

```bash
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-katex
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-katex"
```

**Container** - Docker installed locally:

```bash
alias hugo='docker run --rm -v "$PWD":/src -p 1313:1313 hugomods/hugo:go-git hugo'
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-katex
```

## Usage

**Self-closing shortcode** - Formula passed as `expr`, the handiest for one-liners:

```text
{{< katex expr="\int_0^1 x^2\,dx = \frac{1}{3}" />}}

Euler's identity: {{< katex-inline expr="e^{i\pi} + 1 = 0" />}}
```

**Shortcode** - Raw formula between the tags, which reads better for long ones:

```text
{{< katex >}}
\begin{aligned}
  a &= b + c \\
    &= d
\end{aligned}
{{< /katex >}}
```

**Self-closing shortcode** - Formula read from a file:

```text
{{< katex src="renderers/katex.txt" />}}
{{< katex-inline src="renderers/katex-inline.txt" />}}
```

**Self-closing shortcode** - Formula passed as base64:

```text
{{< katex b64="XGZyYWN7MX17Mn0=" />}}
```

### Parameters

`katex` (block) and `katex-inline` accept exactly the same parameters.

| Param | Default | Description |
|---|---|---|
| inner content | - | Raw formula between the opening and closing tags |
| `expr` | - | The formula, inline in the shortcode call |
| `src` | - | Path, relative to `assets/`, of a file holding the formula |
| `b64` | - | Base64-encoded formula |
| `trust` | `false` | `true` to enable KaTeX's trust mode |

> At least one source input is required. If several are given, `b64` wins over `expr`, `expr` wins over `src`, and `src` wins over the inner content, the others are ignored silently.

> A missing or empty source fails the build with an explicit error rather than emitting a blank page. An invalid `b64` payload is not caught at build time: it surfaces at render time, in place of the formula.

> `src` is resolved with `readFile` from the project root, so the file must live in your own site's `assets/`. A file mounted from a theme or from another module will not be found.

## Security: the `trust` parameter

With trust disabled, commands such as `\href` produce no links, which keeps formula source from injecting `javascript:` URLs or raw HTML. Enable it only for content you fully control, never for user-submitted formulas:

```text
{{< katex expr="\href{https://example.org}{link}" trust="true" />}}
```

`trust` is per shortcode, so a single trusted formula does not loosen anything else on the page.

## Rendering

The formula is typeset in the reader's browser by KaTeX. `katex` emits a block `<div>` in display mode, `katex-inline` a `<span>` that flows with the surrounding text.

- KaTeX's stylesheet and script, `mhchem` and the glue are injected once per page, at the first `katex` or `katex-inline` shortcode, in the flow of the content, not in `<head>`. Each one is fingerprinted and carries a Subresource Integrity hash.
- The fonts are published next to the fingerprinted stylesheet under their original names, because `katex.min.css` references them through relative `url(fonts/...)`. They are not fingerprinted, and the shortcode forces their publication without emitting any tag for them.
- `mhchem` is always loaded, so `\ce{...}` chemistry notation works with no extra setup.
- KaTeX runs with `throwOnError: false`, so a malformed formula is shown as KaTeX's own error markup in place of the result rather than breaking the page.
- For formulas injected after page load, call `window.HugoModKatex.renderAll(root)`.
- Without JavaScript the shortcode leaves an empty block: there is no server-side fallback.

## Vendored assets

KaTeX `0.16.47` (267 kB of script, 24 kB of stylesheet, plus the full font set) and its `mhchem` contrib (33 kB) ship inside the module, no CDN, no third-party request at page load. Provenance, licenses and SHA-256 are recorded in [VENDORED.md](VENDORED.md).

## License

MIT © 2025 [Julien Poirou](mailto:julienpoirou@protonmail.com)
