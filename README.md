# hugo-mod-katex

[![CI](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-katex/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-katex?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-katex/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg)](https://www.conventionalcommits.org)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-katex logo" width="160" height="160">
</p>

Standalone Hugo module for KaTeX rendering with vendored runtime assets and shortcode helpers for block and inline formulas.

## When to use this module

Recent Hugo versions render math **server-side** with the built-in
`transform.ToMath` function and passthrough render hooks — no client-side
JavaScript, no font payload. Prefer that native path for plain math on modern
Hugo. Reach for this module when you need one of:

- **Offline, vendored assets** with no reliance on Hugo's math pipeline;
- **`mhchem`** chemistry notation ready out of the box;
- a **shortcode-based** authoring flow with `src`/`b64` inputs;
- support for **older Hugo** versions without server-side math.

## Features

- Render block formulas with `{{< katex >}}` or `{{< katex expr="..." />}}`
- Render inline formulas with `{{< katex-inline >}}` or `{{< katex-inline expr="..." />}}`
- Support `src`, `expr`, `b64`, and inline body input modes
- Ship vendored `KaTeX` and `mhchem` assets
- Fail explicitly at build time when shortcode source is missing

## Requirements

- Hugo `>= 0.124`
- A Hugo site with Hugo Modules enabled

## Installation

Import the module in your Hugo site:

```toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-katex"
```

## Usage

Block formula:

```text
{{< katex expr="\int_0^1 x^2\,dx" />}}
```

Inline formula:

```text
Euler: {{< katex-inline expr="e^{i\pi} + 1 = 0" />}}
```

File source:

```text
{{< katex src="renderers/katex.txt" />}}
{{< katex-inline src="renderers/katex-inline.txt" />}}
```

## Security: the `trust` parameter

Rendering runs with KaTeX `trust` **disabled by default**. With trust off,
commands such as `\href` do not produce links, which prevents formula source
from injecting `javascript:` URLs or raw HTML (an XSS vector).

Enable it per shortcode only for content you fully control:

```text
{{< katex expr="\href{https://example.org}{link}" trust="true" />}}
```

Do **not** set `trust="true"` on formulas that come from untrusted or
user-submitted sources.

## Output assets

The module publishes, through Hugo Pipes (`resources.Get` + `fingerprint`),
so each file's published URL includes a content hash for cache-busting and
ships a Subresource Integrity attribute:

- `libs/hugo-mod-katex/katex.min.<hash>.css`
- `libs/hugo-mod-katex/katex.min.<hash>.js`
- `libs/hugo-mod-katex/mhchem.min.<hash>.js`
- `libs/hugo-mod-katex/hugo-mod-katex.<hash>.js`
- `libs/hugo-mod-katex/hugo-mod-katex.<hash>.css`
- `libs/hugo-mod-katex/fonts/*` (published at their original,
  unfingerprinted names — `katex.min.css` references them via relative
  `url(fonts/...)`)

Source files live under `assets/libs/hugo-mod-katex/` in this
repository; see [`VENDORED.md`](VENDORED.md) for their checksums.

## Development

```bash
git clone https://github.com/julienpoirou/hugo-mod-katex
cd hugo-mod-katex
```

The main verification is handled by GitHub Actions with a minimal Hugo site that mounts the module and builds a sample page.

## Contributing

- Use Conventional Commits for branch history
- Update docs or changelog when behavior changes
- Keep shortcode API changes documented in this README
- See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidance
