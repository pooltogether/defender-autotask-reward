const { contractAddresses } = require('@pooltogether/current-pool-data')
const { reward } = require('./reward')
const { Relayer } = require('defender-relay-client');
exports.handler =  async function(event, context) {
  const relayer = new Relayer(event);
  const poolNames = Object.keys(contractAddresses[3])
  const prizeStrategyAddresses = poolNames.map(name => contractAddresses[3][name].prizeStrategy)
  await reward(
    relayer,
    'ropsten',
    prizeStrategyAddresses
  )
}