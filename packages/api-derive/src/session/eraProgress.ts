// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { BlockNumber } from '@5ire/types/interfaces';

import { map } from 'rxjs';

import { memo } from '../util';

export function eraProgress (instanceId: string, api: ApiInterfaceRx): () => Observable<BlockNumber> {
  return memo(instanceId, (): Observable<BlockNumber> =>
    api.derive.session.progress().pipe(
      map((info) => info.eraProgress)
    ));
}
