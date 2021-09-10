const { reward } = require('./reward')
const { Relayer } = require('defender-relay-client');

exports.handler =  async function(event) {
  await reward(new Relayer(event),'celo')
}