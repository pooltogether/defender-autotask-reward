// NOTE: This file is just an example of an OpenZeppelin Defender Autotask

// Paste reward-bundle.js here

// Then append code like: 

const { Relayer } = require('defender-relay-client');
exports.handler =  async function(event, context) {
  const relayer = new Relayer(event);
  await reward_1(
    relayer,
    'rinkeby',
    [
      "0x93cdCEC6F27F61Fa820C8f0F15dc90D4e4eDC054",
      "0x0c09cE9050792845DbAc83C2Fb6D81c302DcA99a",
      "0x86ef829a2032ee0f5527ca3cf7935bc0c29a685d",
      "0xb683e56f2cabd38d18f2a865d40013776e56f975",
      "0xdfb25daa8743b6b0250b165aa0965b37cc1897c8",
      "0x322d94782f3bebb731301a48a0e550197fa7bf9f"
    ]
  )
}