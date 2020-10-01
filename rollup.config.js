import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const baseConfig = {
  external: ['ethers', 'defender-relay-client'],
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

export default [{
  ...baseConfig,
  input: 'src/rinkeby.js',
  output: {
    file: 'dist/rinkeby-bundle.js',
    format: 'cjs',
    exports: 'named'
  },
}]
