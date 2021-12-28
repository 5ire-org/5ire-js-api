// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, Address } from '@5ire/types/interfaces';
import type { IKeyringPair } from '@5ire/types/types';

import { isFunction } from '@5ire/util';

export function isKeyringPair (account: string | IKeyringPair | AccountId | Address): account is IKeyringPair {
  return isFunction((account as IKeyringPair).sign);
}
