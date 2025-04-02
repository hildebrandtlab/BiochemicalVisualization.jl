import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace'; // Import the replace plugin

export default {
  input: 'index.ts',
  output: {
    file: 'dist/biochemicalvisualization.js',
    format: 'es',
    inlineDynamicImports: true, // Inline dynamic imports
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    replace({ // Add the replace plugin
      'process.env.NODE_ENV': JSON.stringify('production'), // or 'development'
      preventAssignment: true,
    }),
  ],
};