#!/usr/bin/env node

const { program } = require('commander')
const { reward } = require('./reward')
const { Relayer } = require('defender-relay-client')

program
  .option('-n, --network [network]', 'select the network', 'rinkeby')
  .option('-a, --addresses [addresses...]', 'single random winner addresses', [])
  .option('-da, --defenderApiKey [apiKey]', 'OpenZeppelin Defender Relayer API key')
  .option('-ds, --defenderSecret [secret]', 'OpenZeppelin Defender Relayer Secret')

program.parse(process.argv)

console.log(program.opts())

let relayer
if (program.defenderApiKey && program.defenderSecret) {
  relayer = new Relayer({apiKey: program.defenderApiKey, apiSecret: program.defenderSecret});
}

reward(relayer, program.network, program.addresses)
