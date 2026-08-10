# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-katex/`, all from KaTeX 0.16.47.

| File | Library | License | SHA-256 |
|---|---|---|---|
| `katex.min.js` | [KaTeX](https://github.com/KaTeX/KaTeX) | MIT | `a29d2961d3146de5949d78ac7c1a9d93ae54955bad22a6db4fbe836e88e8bf48` |
| `katex.min.css` | KaTeX | MIT | `0289a02cf451a44dd73add683a09644252363871ac11713a647b732cee8b1ee3` |
| `mhchem.min.js` | [mhchem](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem) (KaTeX contrib) | MIT | `aaf20145c0b8ecd450ccf6eb0cebece2f77d8e6a02c30d291f28c1167b57b2df` |

Sources: `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.js`, `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css`, `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/contrib/mhchem.min.js`.

The 62 font files under `fonts/` come from `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/fonts/` and belong to the same release. They are not listed individually: `katex.min.css` references them by name, so a mismatched font set surfaces as a broken glyph rather than as a supply-chain question.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-katex.js`, `hugo-mod-katex.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-katex/katex.min.js
sha256sum assets/libs/hugo-mod-katex/katex.min.css
sha256sum assets/libs/hugo-mod-katex/mhchem.min.js
```
