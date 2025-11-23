// src/index.esm.js - Optimized PDFTron WebViewer SDK

export async function createPdfViewer(options) {
  const {
    container,
    path = './lib/webviewer',
    initialDoc,
    licenseKey = '',
    disabledElements = [
      'header',
      'toolsHeader',
      'ribbons',
      'leftPanel',
      'searchPanel',
      'notesPanel',
      'thumbnailsPanel',
      'outlinesPanel',
      'layersPanel',
      'bookmarksPanel'
    ],
    enableAnnotations = true,
    enableMeasurement = false,
    enableRedaction = false,
    enableFilePicker = true
  } = options;

  if (!container) {
    throw new Error('Container element is required');
  }

  // Dynamically load WebViewer script
  if (!window.WebViewer) {
    await loadWebViewerScript(path);
  }

  // Initialize WebViewer with optimized settings
  const instance = await window.WebViewer({
    path,
    initialDoc,
    licenseKey,
    // Performance optimizations
    fullAPI: false, // Use lean mode (smaller bundle)
    enableRedaction: enableRedaction,
    enableMeasurement: enableMeasurement,
    disabledElements: disabledElements,
    // UI customization
    ui: 'legacy', // Use simpler UI (smaller bundle)
    css: path + '/custom-style.css'
  }, container);

  const { Core, UI } = instance;

  // Disable features to reduce resource usage
  if (!enableAnnotations) {
    Core.documentViewer.getAnnotationManager().enableReadOnlyMode();
  }

  // Custom API
  return {
    instance,
    
    // Document operations
    loadDocument: (doc) => UI.loadDocument(doc),
    
    // Get current document
    getDocument: () => Core.documentViewer.getDocument(),
    
    // Page operations
    getCurrentPage: () => Core.documentViewer.getCurrentPage(),
    setCurrentPage: (pageNum) => Core.documentViewer.setCurrentPage(pageNum),
    getPageCount: () => Core.documentViewer.getPageCount(),
    
    // Zoom operations
    zoomIn: () => UI.zoomIn(),
    zoomOut: () => UI.zoomOut(),
    setZoom: (zoom) => Core.documentViewer.setZoom(zoom),
    getZoom: () => Core.documentViewer.getZoom(),
    
    // Annotation operations (if enabled)
    getAnnotationManager: () => Core.annotationManager,
    
    // Export/Download
    downloadPdf: async (filename = 'document.pdf') => {
      const doc = Core.documentViewer.getDocument();
      const data = await doc.getFileData({});
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    
    // Get raw instance
    getInstance: () => instance,
    getCore: () => Core,
    getUI: () => UI
  };
}

function loadWebViewerScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${path}/webviewer.min.js`;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load WebViewer'));
    document.head.appendChild(script);
  });
}

export default { createPdfViewer };
