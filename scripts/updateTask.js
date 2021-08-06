#!/usr/bin/env node

const { program } = require('commander');
program.option('-n, --network <string>', 'select network (mainnet, rinkeby, polygon or binance)')
program.parse(process.argv)

const options = program.opts()

const { AutotaskClient } = require('defender-autotask-client');
const fs = require('fs')

async function updateAutotask(autotaskId, file) {
  const client = new AutotaskClient({apiKey: process.env.DEFENDER_TEAM_API_KEY, apiSecret: process.env.DEFENDER_TEAM_SECRET_KEY});
  const source = fs.readFileSync(file);
  console.log(`Updating autotask ${autotaskId} with sourcefile ${file}`)
  await client.updateCodeFromSources(autotaskId, {
    'index.js': source
  });
}

async function run() {
  if (options.network == 'mainnet') {
    await updateAutotask(process.env.MAINNET_AUTOTASK_ID, './dist/mainnet-bundle.js')
  }
  else if (options.network == 'rinkeby') {
    await updateAutotask(process.env.RINKEBY_AUTOTASK_ID, './dist/rinkeby-bundle.js')
  }
  else if (options.network == 'polygon') {
    await updateAutotask(process.env.POLYGON_AUTOTASK_ID, './dist/polygon-bundle.js')  
  }
  else if (options.network == 'binance') {
    await updateAutotask(process.env.BINANCE_AUTOTASK_ID, './dist/binance-bundle.js')  
  } else {
    throw new Error(`Unknown network ${options.network}`)
  }
}

run()
