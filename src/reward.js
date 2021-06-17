const ethers = require("ethers")
const PeriodicPrizeStrategyABI = require("@pooltogether/pooltogether-contracts/abis/PeriodicPrizeStrategy.json")
const { getPrizeStrategies } = require('./getPrizeStrategies')

exports.reward = async function (relayer, network) {
  const periodicPrizeStrategies = getPrizeStrategies(network)

  let provider
  if(network == 'polygon'){
    provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/"+process.env.INFURA_API_KEY) // ethers Provider does not support polygon-infura
  }
  else{
    provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY)
  }
  

  for (let i = 0; i < periodicPrizeStrategies.length; i++) {
    const periodicPrizeStrategyAddress = periodicPrizeStrategies[i]
    console.log(`Checking PeriodicPrizeStrategy(${periodicPrizeStrategyAddress})`)
    const periodicPrizeStrategy = new ethers.Contract(periodicPrizeStrategyAddress, PeriodicPrizeStrategyABI, provider)

    if (await periodicPrizeStrategy.canStartAward()) {
      console.log(`Starting award for ${periodicPrizeStrategyAddress}...`)

      if (relayer) {
        const unsignedTx = await periodicPrizeStrategy.populateTransaction.startAward()
        const gasLimit = (await periodicPrizeStrategy.estimateGas.startAward()).toNumber()
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
      
    } else if (await periodicPrizeStrategy.canCompleteAward()) {
      console.log(`Completing award for ${periodicPrizeStrategyAddress}...`)

      if (relayer) {
        const unsignedTx = await periodicPrizeStrategy.populateTransaction.completeAward()
        const gasLimit = (await periodicPrizeStrategy.estimateGas.completeAward()).toNumber()
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
