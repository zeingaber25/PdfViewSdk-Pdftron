# How to Reduce PDFTron Bundle Size

## Problem
Full PDFTron WebViewer is ~147MB with 635 files. Most applications only need basic PDF viewing and annotation.

## Solution
Copy only essential files to reduce size to ~15MB (90% reduction).

## Step-by-Step Manual Copy

### Source Location
```
node_modules/@pdftron/webviewer/public/
```

### Target Location
```
examples/plain-html/lib/webviewer/
```

### Files to Copy

#### 1. Main Library (2.4 MB)
Copy these files from the root `public/` folder:
- ✅ `webviewer.min.js` - Main WebViewer library

#### 2. Core PDF Engine (8 MB)
From `public/core/pdf/`:
- ✅ `PDFNet.js` - PDF engine JavaScript
- ✅ `PDFNetLean.wasm` - Lean WASM binary (**use this one**)
- ❌ Skip `PDFNet.wasm` (full version, much larger)
- ❌ Skip `PDFNet.br`, `PDFNet.gz` (compressed versions)

#### 3. UI Components (9 MB)
From `public/ui/`:
- ✅ `index.html` - UI template
- ✅ `app.js` - UI JavaScript
- ✅ `app.css` - UI styles
- ❌ Skip other files

#### 4. Assets
From `public/core/assets/`:
- ✅ `viewer.html` - PDF viewer HTML template

### Optional Files (for specific features)

#### Annotations Support
From `public/core/`:
- `WebWorker.js` - For background processing

#### Search Support  
From `public/core/`:
- Search-related worker files (if needed)

## PowerShell Commands

If you want to automate the copy:

```powershell
# Set paths
$source = "c:\IMO\SDK\pdf-viewer-sdk\node_modules\@pdftron\webviewer\public"
$target = "c:\IMO\SDK\pdf-viewer-sdk\examples\plain-html\lib\webviewer"

# Create target directories
New-Item -ItemType Directory -Force -Path "$target\core\pdf"
New-Item -ItemType Directory -Force -Path "$target\core\assets"
New-Item -ItemType Directory -Force -Path "$target\ui"

# Copy main library
Copy-Item "$source\webviewer.min.js" -Destination $target

# Copy core PDF engine (lean mode)
Copy-Item "$source\core\pdf\PDFNet.js" -Destination "$target\core\pdf\"
Copy-Item "$source\core\pdf\PDFNetLean.wasm" -Destination "$target\core\pdf\"

# Copy UI files
Copy-Item "$source\ui\index.html" -Destination "$target\ui\"
Copy-Item "$source\ui\app.js" -Destination "$target\ui\"
Copy-Item "$source\ui\app.css" -Destination "$target\ui\"

# Copy assets
Copy-Item "$source\core\assets\viewer.html" -Destination "$target\core\assets\"

Write-Host "Done! Copied essential files (~15MB)"
```

## Verification

After copying, your folder structure should look like:

```
examples/plain-html/lib/webviewer/
├── webviewer.min.js          (~450 KB)
├── core/
│   ├── pdf/
│   │   ├── PDFNet.js         (~100 KB)
│   │   └── PDFNetLean.wasm   (~7 MB)
│   └── assets/
│       └── viewer.html       (~5 KB)
└── ui/
    ├── index.html            (~10 KB)
    ├── app.js                (~7 MB)
    └── app.css               (~400 KB)

Total: ~15 MB (instead of ~147 MB)
```

## What Features Still Work?

✅ **Fully Supported:**
- PDF viewing
- Page navigation
- Zoom controls
- Annotations (drawing, text, etc.)
- Signatures
- Form filling
- Search
- Thumbnails
- Bookmarks
- Print
- Download

❌ **Not Included (to save space):**
- Office document viewing (DOCX, XLSX, PPTX)
- CAD files
- Full API mode (use lean mode)
- Legacy browser support

## Testing

1. Open `examples/plain-html/pdftron.html` in browser
2. PDF should load correctly
3. All viewer controls should work
4. Can add annotations and signatures
5. Can download PDF with annotations

## Troubleshooting

### Error: "Failed to load WebViewer"
- ✅ Check that `webviewer.min.js` exists in the lib folder
- ✅ Verify file paths are correct

### Error: "WASM binary not found"
- ✅ Make sure `PDFNetLean.wasm` is in `lib/webviewer/core/pdf/`
- ✅ Check file name (must be exactly `PDFNetLean.wasm`)

### PDF doesn't load
- ✅ Check browser console for errors
- ✅ Verify `PDFNet.js` exists
- ✅ Make sure sample PDF file exists

### UI doesn't appear
- ✅ Check that `ui/` folder contains `index.html`, `app.js`, `app.css`
- ✅ Verify paths in WebViewer config

## Alternative: Use Automated Script

If Node.js is installed, run:

```bash
npm run copy-webviewer
```

This will automatically copy only the essential files.

## Size Comparison

| What | Size |
|------|------|
| Full PDFTron WebViewer | 147 MB (635 files) |
| Optimized (lean mode) | 15 MB (8-10 files) |
| **Savings** | **90% smaller** |

## Next Steps

After copying files:
1. Open `pdftron.html` to test
2. Customize UI in the HTML file
3. Add your own PDF documents
4. Deploy to your server

---

**Note:** PDFTron trial works without a license key for testing. For production, you'll need a license from PDFTron.