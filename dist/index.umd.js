(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PdfViewerSDK = {}));
})(this, (function (exports) { 'use strict';

  // src/index.esm.js

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  async function createPdfViewer(options) {
    const {
      container,
      path = "/webviewer/lib", // <-- your hosted lib folder
      initialDoc,
      licenseKey = ""
    } = options;

    if (!container) throw new Error("container is required");

    // Load WebViewer from your own hosted folder
    await loadScript(`${path}/webviewer.min.js`);

    if (typeof WebViewer !== "function") {
      throw new Error("WebViewer is not available after loading script");
    }

    const instance = await WebViewer(
      {
        path,        // path to your hosted lib folder
        initialDoc,
        licenseKey
      },
      container
    );

    return {
      instance,
      loadDocument: (doc) => instance.UI.loadDocument(doc),
      getInstance: () => instance
    };
  }

  exports.createPdfViewer = createPdfViewer;

}));
