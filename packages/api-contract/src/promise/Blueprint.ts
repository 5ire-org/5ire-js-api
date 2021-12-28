// Copyright 2017-2021 @polkadot/api-contract authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@5ire/types/interfaces';
import type { AnyJson } from '@5ire/types/types';

import { ApiPromise, decorateMethodPromise } from '@5ire/api';

import { Abi } from '../Abi';
import { Blueprint as BaseBlueprint } from '../base';

export class Blueprint extends BaseBlueprint<'promise'> {
  constructor (api: ApiPromise, abi: AnyJson | Abi, codeHash: string | Hash) {
    super(api, abi, codeHash, decorateMethodPromise);
  }
}
