# @polkadot/api-contract

Interfaces to allow for the encoding and decoding of Substrate contract ABIs.

```js
import {ApiPromise, WsProvider } from '@5ire/api';
import { Abi } from '@5ire/api-contract';

const wsProvider = new WsProvider(<...Node Url...>);
const api = await ApiPromise.create({ provider: wsProvider });
const abi = new Abi(<...JSON ABI...>, api.registry.getChainProperties());

api.tx.contracts
  .call(<contract addr>, <value>, <max gas>, abi.messages.<method name>(<...params...>))
  .signAndSend(<keyring pair>, (result: SubmittableResult) => { ... });
```
