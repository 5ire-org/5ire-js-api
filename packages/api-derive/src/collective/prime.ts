// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { Option } from '@5ire/types';
import type { AccountId } from '@5ire/types/interfaces';

import { map, of } from 'rxjs';

import { isFunction } from '@5ire/util';

import { memo } from '../util';
import { getInstance } from './getInstance';

export function prime (instanceId: string, api: ApiInterfaceRx, _section: string): () => Observable<AccountId | null> {
  const section = getInstance(api, _section);

  return memo(instanceId, (): Observable<AccountId | null> =>
    isFunction(api.query[section as 'council']?.prime)
      ? api.query[section as 'council'].prime<Option<AccountId>>().pipe(
        map((optPrime): AccountId | null =>
          optPrime.unwrapOr(null)
        )
      )
      : of(null)
  );
}
