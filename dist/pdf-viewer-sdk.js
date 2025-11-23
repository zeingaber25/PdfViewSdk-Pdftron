(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PdfViewerSDK = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var index_esm$2 = {exports: {}};

	var index_esm$1 = index_esm$2.exports;

	var hasRequiredIndex_esm;

	function requireIndex_esm () {
		if (hasRequiredIndex_esm) return index_esm$2.exports;
		hasRequiredIndex_esm = 1;
		(function (module, exports$1) {
			// src/index.esm.js
			(function (global, factory) {
			  factory(exports$1) ;
			})(index_esm$1, (function (exports$1) {

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

			  exports$1.createPdfViewer = createPdfViewer;
			  Object.defineProperty(exports$1, '__esModule', { value: true });
			})); 
		} (index_esm$2, index_esm$2.exports));
		return index_esm$2.exports;
	}

	var index_esmExports = requireIndex_esm();
	var index_esm = /*@__PURE__*/getDefaultExportFromCjs(index_esmExports);

	return index_esm;

}));
