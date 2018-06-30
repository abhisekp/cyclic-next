import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify-es';
import progress from 'rollup-plugin-progress';
import flow from 'rollup-plugin-flow';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      sourceMap: true,
      name: 'cyclicNext',
    },
    plugins: [
      progress({
        clearLine: false,
      }),
      flow({
        all: true,
        pretty: true,
      }),
      resolve(),
      commonjs(),
      buble({
        // transpile ES2015+ to ES5
        exclude: ['node_modules/**'],
      }),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `file` and `format`)
  {
    input: 'src/index.js',

    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [
      progress({
        clearLine: false,
      }),
      flow({
        all: true,
      }),
      buble({
        exclude: ['node_modules/**'],
      }),
      uglify(),
    ],
  },
];
