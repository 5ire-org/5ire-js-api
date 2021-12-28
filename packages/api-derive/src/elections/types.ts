// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { u32 } from '@5ire/types';
import type { AccountId, Balance, BlockNumber, SetIndex, VoteIndex } from '@5ire/types/interfaces';

export interface DeriveElectionsInfo {
  candidates: AccountId[];
  candidateCount: u32;
  candidacyBond?: Balance;
  desiredRunnersUp?: u32;
  desiredSeats?: u32;
  members: [AccountId, Balance][];
  nextVoterSet?: SetIndex;
  runnersUp: [AccountId, Balance][];
  termDuration?: BlockNumber;
  voteCount?: VoteIndex;
  voterCount?: SetIndex;
  votingBond?: Balance;
}
