const { contractAddresses } = require('@pooltogether/current-pool-data')

function getPrizeStrategies(network) {
  let prizeStrategyAddresses = []
  if (network == 'rinkeby') {
    prizeStrategyAddresses.push(contractAddresses[4].dai.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[4].usdc.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[4].usdt.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[4].bat.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[4].fastDai.prizeStrategy)
  } else if (network == 'mainnet') {
    // prizeStrategyAddresses.push(contractAddresses[1].dai.prizeStrategy) // commented out as Upkeep System is handling
    // prizeStrategyAddresses.push(contractAddresses[1].uni.prizeStrategy)
    // prizeStrategyAddresses.push(contractAddresses[1].usdc.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[1].usdt.prizeStrategy)
    // prizeStrategyAddresses.push(contractAddresses[1].comp.prizeStrategy)
    // prizeStrategyAddresses.push(contractAddresses[1].pool.prizeStrategy)
    // prizeStrategyAddresses.push(contractAddresses[1].badger.prizeStrategy)
  } else if (network == 'polygon') {
    prizeStrategyAddresses.push(contractAddresses[137].dai.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[137].usdt.prizeStrategy)
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizeStrategyAddresses
}

module.exports = {
  getPrizeStrategies
}
