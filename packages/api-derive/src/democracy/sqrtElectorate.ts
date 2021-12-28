// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { BN } from '@5ire/util';

import { map } from 'rxjs';

import { bnSqrt } from '@5ire/util';

import { memo } from '../util';

export function sqrtElectorate (instanceId: string, api: ApiInterfaceRx): () => Observable<BN> {
  return memo(instanceId, (): Observable<BN> =>
    api.query.balances.totalIssuance().pipe(
      map((totalIssuance) =>
        bnSqrt(totalIssuance)
      )
    )
  );
}
