# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table, and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-katex/`, all from KaTeX 0.16.47.

| File | Library | License | SHA-256 |
|---|---|---|---|
| `katex.min.js` | [KaTeX](https://github.com/KaTeX/KaTeX) | MIT | `a29d2961d3146de5949d78ac7c1a9d93ae54955bad22a6db4fbe836e88e8bf48` |
| `katex.min.css` | KaTeX | MIT | `0289a02cf451a44dd73add683a09644252363871ac11713a647b732cee8b1ee3` |
| `mhchem.min.js` | [mhchem](https://github.com/KaTeX/KaTeX/tree/main/contrib/mhchem) (KaTeX contrib) | MIT | `aaf20145c0b8ecd450ccf6eb0cebece2f77d8e6a02c30d291f28c1167b57b2df` |

Sources: `https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/` for `katex.min.js`, `katex.min.css`, `contrib/mhchem.min.js`, and `fonts/`.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-katex.js`, `hugo-mod-katex.css`.

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-katex/katex.min.js
sha256sum assets/libs/hugo-mod-katex/katex.min.css
sha256sum assets/libs/hugo-mod-katex/mhchem.min.js
```
