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

## Output assets

The module publishes:

- `vendor/hugo-mod-katex/katex.min.css`
- `vendor/hugo-mod-katex/katex.min.js`
- `vendor/hugo-mod-katex/mhchem.min.js`
- `vendor/hugo-mod-katex/hugo-mod-katex.js`
- `vendor/hugo-mod-katex/hugo-mod-katex.css`

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
