import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.ts',
  output: {
    file: 'dist/biochemicalvisualization.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    // Bonito embeds the bundle base64-encoded in each notebook cell's
    // payload, so raw bundle size = notebook size. Minification cuts
    // the bundle ~5x and is non-negotiable for multi-cell notebooks.
    terser(),
  ],
};