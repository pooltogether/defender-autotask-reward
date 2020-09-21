// NOTE: This file is just an example of an OpenZeppelin Defender Autotask

// Paste reward-bundle.js here

// Then append code like: 

const { Relayer } = require('defender-relay-client');
exports.handler =  async function(event, context) {
  const relayer = new Relayer(event);
  reward_1(
    relayer,
    'rinkeby',
    [
      "0xE198C2C9A6bf092527FC86bc965329E334D1Cd05",
      "0x7A7f3E1B43965F9E920EcCDeFADB37dC2B33e482",
    ]
  )
}