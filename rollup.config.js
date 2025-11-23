// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.esm.js',
  output: {
    file: 'dist/pdf-viewer-sdk.js',
    format: 'umd',
    name: 'PdfViewerSDK', // global object
  },
  plugins: [
    resolve(),
    commonjs(),
    // copy WebViewer lib to dist folder
    copy({
      targets: [
        { src: 'node_modules/@pdftron/webviewer/public/**', dest: 'dist/webviewer' }
      ],
      copyOnce: true
    })
  ],
};
