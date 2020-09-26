# PoolTogether V3 Single Random Winner Defender Autotask

This project implements an Autotask for OpenZeppelin Defender that rewards the PoolTogether V3 Single Random Winner prize strategies automatically.

# Usage

First build the project:

```sh
$ yarn build
```

This will create `dist/reward-build.js`.

Next create a new Autotask in Defender bound to a Relay.  Cut and paste the contents of the above file into the `Code` portion of the relayer.

Below the pasted code, append the snippet:

```javascript
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
```

# Running locally

You can use the CLI as well to test out the task:

```
$ yarn cli
```

There's a precooked command called `rinkeby` that uses env vars.

First setup the vars:

```
$ cp .envrc.example .envrc
```

Now allow direnv

```
$ direnv allow
```

Set the vars to what you need, then run:

```
$ yarn rinkeby
```