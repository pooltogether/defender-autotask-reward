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
  } else if (network == 'polygon') {
    prizeStrategyAddresses.push(contractAddresses[137].dai.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[137].usdt.prizeStrategy)
    prizeStrategyAddresses.push(contractAddresses[137].usdc.prizeStrategy)
  } else if (network == 'binance') {
    prizeStrategyAddresses = [
      '0x9f76c70F387f423B756234e80F2765ACfB689105',
      '0x950c7052e7c19905e665441c5a421e4dd7a0ebae'
    ]
  } else {
    throw new Error(`Unknown network: ${network}`)
  }
  return prizeStrategyAddresses
}

module.exports = {
  getPrizeStrategies
}
