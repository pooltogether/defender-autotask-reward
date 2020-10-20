const ethers = require("ethers")
const SingleRandomWinnerAbi = require("@pooltogether/pooltogether-contracts/abis/SingleRandomWinner.json")

exports.reward = async function (relayer, network, singleRandomWinnerAddresses = []) {
  const provider = await ethers.getDefaultProvider(network)

  for (let i = 0; i < singleRandomWinnerAddresses.length; i++) {
    const singleRandomWinnerAddress = singleRandomWinnerAddresses[i]
    console.log(`Checking SingleRandomWinner(${singleRandomWinnerAddress})`)
    const singleRandomWinner = new ethers.Contract(singleRandomWinnerAddress, SingleRandomWinnerAbi, provider)

    if (await singleRandomWinner.canStartAward()) {
      console.log(`Starting award for ${singleRandomWinnerAddress}...`)

      if (relayer) {
        const unsignedTx = await singleRandomWinner.populateTransaction.startAward()
        const gasLimit = (await singleRandomWinner.estimateGas.startAward()).toNumber()
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
