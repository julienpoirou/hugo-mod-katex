# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the files, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `assets/libs/hugo-mod-katex/katex.min.js` | [KaTeX](https://github.com/KaTeX/KaTeX) | 0.16.47 | `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.js` | MIT | `a29d2961d3146de5949d78ac7c1a9d93ae54955bad22a6db4fbe836e88e8bf48` |
| `assets/libs/hugo-mod-katex/katex.min.css` | KaTeX | 0.16.47 | `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css` | MIT | `0289a02cf451a44dd73add683a09644252363871ac11713a647b732cee8b1ee3` |
| `assets/libs/hugo-mod-katex/mhchem.min.js` | [mhchem](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem) (KaTeX contrib) | 0.16.47 | `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/contrib/mhchem.min.js` | MIT | `aaf20145c0b8ecd450ccf6eb0cebece2f77d8e6a02c30d291f28c1167b57b2df` |
| `assets/libs/hugo-mod-katex/fonts/*` | KaTeX fonts | 0.16.47 | `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/fonts/` | MIT (OFL-covered glyphs) | *(see note)* |

The `fonts/` directory holds the KaTeX web fonts (woff2/woff/ttf) that ship
with the release above. Verify any font with `sha256sum`.

First-party files (not covered above): `assets/libs/hugo-mod-katex/hugo-mod-katex.js`,
`assets/libs/hugo-mod-katex/hugo-mod-katex.css` — licensed under this
repository's [LICENSE](LICENSE).

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-katex/katex.min.js
sha256sum assets/libs/hugo-mod-katex/katex.min.css
sha256sum assets/libs/hugo-mod-katex/mhchem.min.js
```
