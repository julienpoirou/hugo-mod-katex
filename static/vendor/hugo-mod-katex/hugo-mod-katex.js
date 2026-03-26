(() => {
  if (window.__hugoModKatexInit) return;
  window.__hugoModKatexInit = true;

  // Shortcodes pass source through base64 so Hugo does not mangle formulas.
  const decodeBase64Utf8 = (value) => {
    const binary = window.atob(value || "");
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }

    let escaped = "";
    for (let index = 0; index < binary.length; index += 1) {
      escaped += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
    }
    return decodeURIComponent(escaped);
  };

  const renderElement = (element) => {
    if (!window.katex || element.dataset.rendered === "true") return;

    const output = element.querySelector("[data-katex-output]");
    if (!output) return;

    try {
      const source = decodeBase64Utf8(element.dataset.source || "").trim();
      if (!source) {
        throw new Error("KaTeX source is empty");
      }

      output.innerHTML = window.katex.renderToString(source, {
        displayMode: element.dataset.display === "true",
        throwOnError: false,
        trust: true
      });
      output.classList.remove("is-error");
      element.dataset.rendered = "true";
    } catch (error) {
      output.textContent = error.message;
      output.classList.add("is-error");
    }
  };

  const renderAll = (root = document) => {
    root.querySelectorAll("[data-hugo-mod-katex]").forEach(renderElement);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll(), { once: true });
  } else {
    renderAll();
  }

  window.HugoModKatex = { renderAll };
})();
