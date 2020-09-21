const ethers = require("ethers")
const SingleRandomWinnerAbi = require("@pooltogether/pooltogether-contracts/abis/SingleRandomWinner.json")

exports.reward = async function (relayer, network, singleRandomWinnerAddresses = []) {
  // const relayer = new Relayer(event);
  const provider = ethers.getDefaultProvider(network)

  const txs = []

  for (let i = 0; i < singleRandomWinnerAddresses.length; i++) {
    const singleRandomWinnerAddress = singleRandomWinnerAddresses[i]
    const singleRandomWinner = new ethers.Contract(singleRandomWinnerAddress, SingleRandomWinnerAbi, provider)

    if (await singleRandomWinner.canStartAward()) {
      console.log(`Starting award for ${singleRandomWinnerAddress}...`)

      const unsignedTx = await singleRandomWinner.populateTransaction.startAward()
      if (relayer) {
        txs.push({
          to: singleRandomWinnerAddress,
          type: 'start',
          tx: await relayer.sendTransaction({
            to: unsignedTx.to,
            data: unsignedTx.data,
            gasLimit: 500000,
            speed: 'average'
          })
        })
      } else {
        console.warn('No relayer present.  Cannot start award.')
      }
      
    } else if (await singleRandomWinner.canCompleteAward()) {

      console.log(`Completing award for ${singleRandomWinnerAddress}...`)

      const unsignedTx = await singleRandomWinner.populateTransaction.completeAward()
      if (relayer) {
        txs.push({
          to: singleRandomWinnerAddress,
          type: 'complete',
          tx: await relayer.sendTransaction({
            to: unsignedTx.to,
            data: unsignedTx.data,
            gasLimit: 500000,
            speed: 'average'
          })
        })
      } else {
        console.warn('No relayer present.  Cannot complete award.')
      }

    }

  }

  let intervalId = setInterval(async () => {
    let isComplete = true

    for (let x = 0; x < txs.length; x++) {
      let tx = txs[x]
      let latestTx = await relayer.query(tx.tx.transactionId)
      txs[x].status = latestTx.status

      if (latestTx.status !== 'confirmed') {
        isComplete = false
      }
    }

    if (isComplete) {
      clearInterval(intervalId)
    }

  }, 500)

}
