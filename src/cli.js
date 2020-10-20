#!/usr/bin/env node

const { program } = require('commander')
const { reward } = require('./reward')
const { Relayer } = require('defender-relay-client')
const { contractAddresses } = require('@pooltogether/current-pool-data')

program
  .option('-n, --network [network]', 'select the network', 'rinkeby')
  .option('-da, --defenderApiKey [apiKey]', 'OpenZeppelin Defender Relayer API key')
  .option('-ds, --defenderSecret [secret]', 'OpenZeppelin Defender Relayer Secret')

program.parse(process.argv)

console.log(program.opts())

let relayer
if (program.defenderApiKey && program.defenderSecret) {
  relayer = new Relayer({apiKey: program.defenderApiKey, apiSecret: program.defenderSecret});
}

let prizeStrategyAddresses
if (program.network == 'rinkeby') {
  const poolNames = Object.keys(contractAddresses[4])
  prizeStrategyAddresses = poolNames.map(name => contractAddresses[4][name].prizeStrategy)
} else if (program.network == 'ropsten') {
  const poolNames = Object.keys(contractAddresses[3])
  prizeStrategyAddresses = poolNames.map(name => contractAddresses[3][name].prizeStrategy)
} else {
  throw new Error(`Unknown network: ${program.network}`)
}

reward(relayer, program.network, prizeStrategyAddresses)
