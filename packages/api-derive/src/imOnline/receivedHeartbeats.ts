// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { Option, u32, WrapperOpaque } from '@5ire/types';
import type { AccountId } from '@5ire/types/interfaces';
import type { PalletImOnlineBoundedOpaqueNetworkState } from '@5ire/types/lookup';
import type { DeriveHeartbeats } from '../types';

import { combineLatest, map, of, switchMap } from 'rxjs';

import { BN_ZERO } from '@5ire/util';

import { memo } from '../util';

type HeartbeatsOpt = Option<WrapperOpaque<PalletImOnlineBoundedOpaqueNetworkState>>;

function mapResult ([result, validators, heartbeats, numBlocks]: [DeriveHeartbeats, AccountId[], HeartbeatsOpt[], u32[]]): DeriveHeartbeats {
  validators.forEach((validator, index): void => {
    const validatorId = validator.toString();
    const blockCount = numBlocks[index];
    const hasMessage = !heartbeats[index].isEmpty;
    const prev = result[validatorId];

    if (!prev || prev.hasMessage !== hasMessage || !prev.blockCount.eq(blockCount)) {
      result[validatorId] = {
        blockCount,
        hasMessage,
        isOnline: hasMessage || blockCount.gt(BN_ZERO)
      };
    }
  });

  return result;
}

/**
 * @description Return a boolean array indicating whether the passed accounts had received heartbeats in the current session
 */
export function receivedHeartbeats (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveHeartbeats> {
  return memo(instanceId, (): Observable<DeriveHeartbeats> =>
    api.query.imOnline?.receivedHeartbeats
      ? api.derive.staking.overview().pipe(
        switchMap(({ currentIndex, validators }): Observable<[DeriveHeartbeats, AccountId[], HeartbeatsOpt[], u32[]]> =>
          combineLatest([
            of({}),
            of(validators),
            api.query.imOnline.receivedHeartbeats.multi(
              validators.map((_address, index) => [currentIndex, index])),
            api.query.imOnline.authoredBlocks.multi(
              validators.map((address) => [currentIndex, address]))
          ])
        ),
        map(mapResult)
      )
      : of({})
  );
}
