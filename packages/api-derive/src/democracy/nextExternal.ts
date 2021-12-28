// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { Option } from '@5ire/types';
import type { H256 } from '@5ire/types/interfaces';
import type { PalletDemocracyVoteThreshold } from '@5ire/types/lookup';
import type { ITuple } from '@5ire/types/types';
import type { DeriveProposalExternal } from '../types';

import { map, of, switchMap } from 'rxjs';

import { memo } from '../util';

function withImage (api: ApiInterfaceRx, nextOpt: Option<ITuple<[H256, PalletDemocracyVoteThreshold]>>): Observable<DeriveProposalExternal | null> {
  if (nextOpt.isNone) {
    return of(null);
  }

  const [imageHash, threshold] = nextOpt.unwrap();

  return api.derive.democracy.preimage(imageHash).pipe(
    map((image): DeriveProposalExternal => ({
      image,
      imageHash,
      threshold
    }))
  );
}

export function nextExternal (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveProposalExternal | null> {
  return memo(instanceId, (): Observable<DeriveProposalExternal | null> =>
    api.query.democracy?.nextExternal
      ? api.query.democracy.nextExternal().pipe(
        switchMap((nextOpt) => withImage(api, nextOpt))
      )
      : of(null)
  );
}
