// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { AccountId } from '@5ire/types/interfaces';

import { prime as collectivePrime } from '../collective';
import { memo } from '../util';

export function prime (instanceId: string, api: ApiInterfaceRx): () => Observable<AccountId | null> {
  return memo(instanceId, collectivePrime(instanceId, api, 'technicalCommittee'));
}
