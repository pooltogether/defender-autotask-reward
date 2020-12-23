const { contractAddresses } = require('@pooltogether/current-pool-data')

function getPrizeStrategies(network) {
  let prizeStrategyAddresses = []
  if (network == 'rinkeby') {
    prizeStrategyAddresses.push(contractAddresses[4].dai.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[4].bat.prizeStrategy)
  } else if (network == 'mainnet') {
    prizeStrategyAddresses.push(contractAddresses[1].dai.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[1].uni.prizeStrategy)
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizeStrategyAddresses
}

module.exports = {
  getPrizeStrategies
}