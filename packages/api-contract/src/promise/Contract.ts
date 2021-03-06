// Copyright 2017-2021 @polkadot/api-contract authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId } from '@5ire/types/interfaces';
import type { AnyJson } from '@5ire/types/types';

import { ApiPromise, decorateMethodPromise } from '@5ire/api';

import { Abi } from '../Abi';
import { Contract as BaseContract } from '../base';

export class Contract extends BaseContract<'promise'> {
  constructor (api: ApiPromise, abi: AnyJson | Abi, address: string | AccountId) {
    super(api, abi, address, decorateMethodPromise);
  }
}
