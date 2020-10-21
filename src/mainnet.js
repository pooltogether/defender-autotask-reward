const { contractAddresses } = require('@pooltogether/current-pool-data')
const { reward } = require('./reward')
const { Relayer } = require('defender-relay-client');
exports.handler =  async function(event, context) {
  const relayer = new Relayer(event);
  const poolNames = Object.keys(contractAddresses[1])
  const prizeStrategyAddresses = poolNames.map(name => contractAddresses[1][name].prizeStrategy)
  await reward(
    relayer,
    'mainnet',
    prizeStrategyAddresses
  )
}