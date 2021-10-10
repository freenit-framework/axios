import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: './lib.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    external(),
    resolve({ preferBuiltins: true }),
    terser(),
    commonjs({ ignoreDynamicRequires: true }),
    babel({ babelHelpers: 'bundled' }),
    image(),
    visualizer(),
  ],
}
