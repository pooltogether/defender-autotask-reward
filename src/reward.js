const ethers = require("ethers")
const PeriodicPrizeStrategyABI = require("@pooltogether/pooltogether-contracts/abis/PeriodicPrizeStrategy.json")
const { getPrizeStrategies } = require('./getPrizeStrategies')

exports.reward = async function (relayer, network) {
  const periodicPrizeStrategies = getPrizeStrategies(network)

  const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY)

  for (let i = 0; i < periodicPrizeStrategies.length; i++) {
    const singleRandomWinnerAddress = periodicPrizeStrategies[i]
    console.log(`Checking SingleRandomWinner(${singleRandomWinnerAddress})`)
    const singleRandomWinner = new ethers.Contract(singleRandomWinnerAddress, PeriodicPrizeStrategyABI, provider)

    if (await singleRandomWinner.canStartAward()) {
      console.log(`Starting award for ${singleRandomWinnerAddress}...`)

      if (relayer) {
        const unsignedTx = await singleRandomWinner.populateTransaction.startAward()
        const gasLimit = (await singleRandomWinner.estimateGas.startAward()).toNumber()
        console.log('GAS LIMIT: ', gasLimit.toString())
        await relayer.sendTransaction({
          to: unsignedTx.to,
          data: unsignedTx.data,
          gasLimit,
          speed: 'average'
        })
      } else {
        console.warn('No relayer present.  Cannot start award.')
      }
      
    } else if (await singleRandomWinner.canCompleteAward()) {
      console.log(`Completing award for ${singleRandomWinnerAddress}...`)

      if (relayer) {
        const unsignedTx = await singleRandomWinner.populateTransaction.completeAward()
        const gasLimit = (await singleRandomWinner.estimateGas.completeAward()).toNumber()
        console.log('GAS LIMIT: ', gasLimit.toString())
        await relayer.sendTransaction({
          to: unsignedTx.to,
          data: unsignedTx.data,
          gasLimit,
          speed: 'average'
        })
      } else {
        console.warn('No relayer present.  Cannot complete award.')
      }
    }
  }
}
