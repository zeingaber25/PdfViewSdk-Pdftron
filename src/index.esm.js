// src/index.esm.js
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.PdfViewerSDK = {}));
})(this, (function (exports) {
  'use strict';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  async function createPdfViewer(options) {
    const {
      container,
      path = './webviewer', // local bundled folder
      initialDoc,
      licenseKey = ''
    } = options;

    if (!container) throw new Error('container is required');

    await loadScript(`${path}/webviewer.min.js`);

    if (typeof WebViewer !== 'function') throw new Error('WebViewer is not available');

    const instance = await WebViewer(
      { path, initialDoc, licenseKey },
      container
    );

    return {
      instance,
      loadDocument: (doc) => instance.UI.loadDocument(doc),
      getInstance: () => instance
    };
  }

  exports.createPdfViewer = createPdfViewer;
  Object.defineProperty(exports, '__esModule', { value: true });
}));
