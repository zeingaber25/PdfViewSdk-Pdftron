# Quick Start Guide

## Easiest Way: Use Standalone HTML

Your PDF viewer SDK is now ready to use **without any installation or build steps**!

### Steps:

1. **Open the standalone file:**
   ```
   examples/plain-html/standalone.html
   ```
   Just double-click it or open it in any web browser.

2. **The PDF will load automatically** with these controls:
   - ⬅️ **Previous** / **Next** ➡️ - Navigate pages
   - 🔍 **Zoom In** / **Zoom Out** - Adjust size
   - ✍️ **Add Signature** - Start drawing signatures
   - 💾 **Save Signature** - Save your drawn signature
   - 🗑️ **Clear Signature** - Remove signatures from current page
   - ⬇️ **Download PDF** - Export PDF with all signatures

3. **How to add signatures:**
   - Click "Add Signature" button
   - Use your mouse (or finger on touch devices) to draw
   - Click "Save Signature" when done
   - Navigate to other pages to add more signatures
   - Click "Download PDF" to get your signed document

## Using Your Own PDF

To view your own PDF file:

1. Place your PDF in the `samples/` folder
2. Open `standalone.html` in a text editor
3. Find this line (near the bottom):
   ```javascript
   await viewer.loadDocument('./samples/sample.pdf');
   ```
4. Change `sample.pdf` to your filename:
   ```javascript
   await viewer.loadDocument('./samples/your-document.pdf');
   ```
5. Save and open in browser

## No Internet? No Problem!

The current version loads PDF.js and pdf-lib from CDN (internet required). To work offline:

1. Download the libraries:
   - PDF.js: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs
   - PDF.js Worker: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs
   - pdf-lib: https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js

2. Save them in your project folder (e.g., `lib/`)

3. Update the import in `standalone.html`:
   ```javascript
   import * as pdfjsLib from './lib/pdf.min.mjs';
   pdfjsLib.GlobalWorkerOptions.workerSrc = './lib/pdf.worker.min.mjs';
   ```

4. Update the pdf-lib script tag:
   ```html
   <script src="./lib/pdf-lib.min.js"></script>
   ```

## Integrating into Your Website

Copy this minimal code into your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My PDF Viewer</title>
  <style>
    #viewer { width: 100%; height: 100vh; }
    /* Add your custom styles */
  </style>
</head>
<body>
  <div id="viewer"></div>
  
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
  
  <script type="module">
    import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs';
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';
    
    // Copy the PdfViewerSDK class from standalone.html
    // Then initialize:
    const viewer = new PdfViewerSDK(document.getElementById('viewer'));
    viewer.loadDocument('path/to/your.pdf');
  </script>
</body>
</html>
```

## Troubleshooting

### PDF not loading?
- Check browser console (F12) for errors
- Verify the PDF file path is correct
- Make sure the PDF file exists in the samples folder

### Signatures not appearing?
- Make sure you clicked "Save Signature" after drawing
- Try clearing browser cache
- Check that JavaScript is enabled

### Download not working?
- Ensure you added at least one signature
- Check browser's download settings
- Try a different browser (Chrome, Firefox, Edge recommended)

## Browser Compatibility

✅ **Works on:**
- Google Chrome / Edge (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

❌ **May not work on:**
- Internet Explorer (use Edge instead)
- Very old browsers

## What's Different from PDFTron?

✅ **New Benefits:**
- No license key required (free!)
- Smaller, faster loading
- Works offline (after first load)
- Direct canvas rendering (no iframe)
- Full source code access
- Easier to customize

🔄 **Changes:**
- UI looks different (but customizable)
- Some PDFTron-specific features removed
- Signatures are simpler (drawing only, no text/image signatures yet)

---

**You're all set!** Open `standalone.html` and start viewing and signing PDFs. 🎉