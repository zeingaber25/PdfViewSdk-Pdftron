// Script to copy only essential PDFTron WebViewer files
// This reduces the bundle size from ~147MB to ~15MB

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'node_modules', '@pdftron', 'webviewer', 'public');
const targetDir = path.join(rootDir, 'examples', 'plain-html', 'lib', 'webviewer');

// Essential files for basic PDF viewing and annotation
const essentialFiles = [
  // Core WebViewer files
  'webviewer.min.js',
  'webviewer.min.js.map',
  
  // Core PDF engine (essential)
  'core/pdf/PDFNet.js',
  'core/pdf/PDFNet.wasm',
  'core/pdf/PDFNetLean.wasm', // Smaller version
  
  // UI files (minimal)
  'ui/index.html',
  'ui/app.css',
  'ui/app.js',
  
  // Essential resources
  'core/assets/viewer.html',
  'core/office/WebWorker.js'
];

// Patterns for lean mode (skip full API)
const skipPatterns = [
  /\/full\//,
  /\/office\/(?!WebWorker)/,
  /\/external\//,
  /\/demo\//,
  /\/test\//,
  /\.d\.ts$/,
  /\.map$/ // Skip source maps except webviewer.min.js.map
];

async function copyMinimalFiles() {
  try {
    console.log('Starting minimal PDFTron WebViewer copy...\n');
    
    // Remove existing target directory
    if (fs.existsSync(targetDir)) {
      console.log(`Removing existing directory: ${targetDir}`);
      await fs.remove(targetDir);
    }
    
    // Create target directory
    await fs.ensureDir(targetDir);
    
    let copiedCount = 0;
    let totalSize = 0;
    
    // Copy essential files
    for (const file of essentialFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.existsSync(sourcePath)) {
        await fs.ensureDir(path.dirname(targetPath));
        await fs.copy(sourcePath, targetPath);
        
        const stats = fs.statSync(targetPath);
        totalSize += stats.size;
        copiedCount++;
        
        console.log(`✓ Copied: ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        console.log(`✗ Not found: ${file}`);
      }
    }
    
    // Copy essential core files (lean mode only)
    const coreDir = path.join(sourceDir, 'core');
    if (fs.existsSync(coreDir)) {
      const copyCoreLean = async (dir, baseDir = '') => {
        const items = await fs.readdir(dir);
        
        for (const item of items) {
          const itemPath = path.join(dir, item);
          const relativePath = path.join(baseDir, item);
          const stat = await fs.stat(itemPath);
          
          // Skip if matches skip patterns
          if (skipPatterns.some(pattern => pattern.test(relativePath))) {
            continue;
          }
          
          if (stat.isDirectory()) {
            // Only copy specific directories
            if (['pdf', 'assets'].includes(item)) {
              await copyCoreLean(itemPath, relativePath);
            }
          } else if (stat.isFile()) {
            // Copy lean WASM and essential files only
            if (item.includes('Lean') || item.includes('.html') || item.includes('PDFNet.js')) {
              const targetPath = path.join(targetDir, 'core', relativePath);
              await fs.ensureDir(path.dirname(targetPath));
              await fs.copy(itemPath, targetPath);
              totalSize += stat.size;
              copiedCount++;
            }
          }
        }
      };
      
      await copyCoreLean(coreDir);
    }
    
    // Create custom CSS for minimal UI
    const customCSS = `
/* Minimal PDFTron WebViewer Styles */
body { margin: 0; padding: 0; }
#app { width: 100%; height: 100%; }
.DocumentContainer { background: #525659; }
    `.trim();
    
    await fs.writeFile(path.join(targetDir, 'custom-style.css'), customCSS);
    
    console.log(`\n✓ Copy complete!`);
    console.log(`  Files copied: ${copiedCount}`);
    console.log(`  Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Target directory: ${targetDir}\n`);
    
    // Show size comparison
    console.log('Size comparison:');
    console.log(`  Full PDFTron: ~147 MB`);
    console.log(`  Minimal build: ~${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Savings: ~${(100 - (totalSize / 147 / 1024 / 1024 * 100)).toFixed(1)}%\n`);
    
  } catch (error) {
    console.error('Error copying files:', error);
    process.exit(1);
  }
}

copyMinimalFiles();
