import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: 'src/reward.js',
  external: ['ethers'],
  output: {
    file: 'dist/reward-bundle.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
}
