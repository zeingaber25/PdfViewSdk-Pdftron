// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.esm.js',
  output: {
    file: 'dist/pdf-viewer-sdk.js',
    format: 'umd',
    name: 'PdfViewerSDK',
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs()
  ],
};
