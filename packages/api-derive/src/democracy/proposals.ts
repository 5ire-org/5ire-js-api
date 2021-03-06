// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { Option, Vec } from '@5ire/types';
import type { AccountId, Balance, Hash, PropIndex } from '@5ire/types/interfaces';
import type { ITuple } from '@5ire/types/types';
import type { DeriveProposal, DeriveProposalImage } from '../types';

import { combineLatest, map, of, switchMap } from 'rxjs';

import { isFunction } from '@5ire/util';

import { memo } from '../util';

type DepositorsNew = Option<ITuple<[Vec<AccountId>, Balance]>>;
type DepositorsOld = Option<ITuple<[Balance, Vec<AccountId>]>>;
type Depositors = DepositorsNew | DepositorsOld;
type Proposals = ITuple<[PropIndex, Hash, AccountId]>[];
type Result = [Proposals, (DeriveProposalImage | undefined)[], Depositors[]];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isNewDepositors (depositors: ITuple<[Vec<AccountId>, Balance]> | ITuple<[Balance, Vec<AccountId>]>): depositors is ITuple<[Vec<AccountId>, Balance]> {
  // Detect balance...
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return isFunction((depositors[1] as Balance).mul);
}

function parse ([proposals, images, optDepositors]: Result): DeriveProposal[] {
  return proposals
    .filter(([, , proposer], index): boolean =>
      !!(optDepositors[index]?.isSome) && !proposer.isEmpty
    )
    .map(([index, imageHash, proposer], proposalIndex): DeriveProposal => {
      const depositors = optDepositors[proposalIndex].unwrap();

      return {
        ...(
          isNewDepositors(depositors)
            ? { balance: depositors[1], seconds: depositors[0] }
            : { balance: depositors[0], seconds: depositors[1] }
        ),
        image: images[proposalIndex],
        imageHash,
        index,
        proposer
      };
    });
}

export function proposals (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveProposal[]> {
  return memo(instanceId, (): Observable<DeriveProposal[]> =>
    isFunction(api.query.democracy?.publicProps) && isFunction(api.query.democracy?.preimages)
      ? api.query.democracy.publicProps<Proposals>().pipe(
        switchMap((proposals) =>
          proposals.length
            ? combineLatest([
              of(proposals),
              api.derive.democracy.preimages(
                proposals.map(([, hash]) => hash)),
              api.query.democracy.depositOf.multi(
                proposals.map(([index]) => index))
            ])
            : of<Result>([[], [], []])
        ),
        map(parse)
      )
      : of([])
  );
}
