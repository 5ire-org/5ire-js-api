// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Vec } from '@5ire/types';
import type { AccountId, Balance, BlockNumber, Hash, PropIndex, Proposal, ReferendumIndex, ReferendumInfoTo239, Vote } from '@5ire/types/interfaces';
import type { PalletDemocracyReferendumStatus, PalletDemocracyVoteThreshold } from '@5ire/types/lookup';
import type { BN } from '@5ire/util';

export interface DeriveDemocracyLock {
  balance: Balance;
  isDelegated: boolean;
  isFinished: boolean;
  referendumEnd: BN;
  referendumId: ReferendumIndex;
  unlockAt: BN;
  vote: Vote;
}

export interface DeriveProposalImage {
  at: BlockNumber;
  balance: Balance;
  proposal?: Proposal;
  proposer: AccountId;
}

export interface DeriveDispatch {
  at: BlockNumber;
  index: ReferendumIndex;
  imageHash: Hash;
  image?: DeriveProposalImage;
}

export interface DeriveProposal {
  balance?: Balance;
  index: PropIndex;
  image?: DeriveProposalImage;
  imageHash: Hash;
  proposer: AccountId;
  seconds: Vec<AccountId>;
}

export interface DeriveProposalExternal {
  image?: DeriveProposalImage;
  imageHash: Hash;
  threshold: PalletDemocracyVoteThreshold;
}

export interface DeriveReferendum {
  index: ReferendumIndex;
  image?: DeriveProposalImage;
  imageHash: Hash;
  status: PalletDemocracyReferendumStatus | ReferendumInfoTo239;
}

export interface DeriveReferendumVote {
  accountId: AccountId;
  balance: Balance;
  isDelegating: boolean;
  vote: Vote;
}

export interface DeriveReferendumVoteState {
  allAye: DeriveReferendumVote[];
  allNay: DeriveReferendumVote[];
  voteCount: number;
  voteCountAye: number;
  voteCountNay: number;
  votedAye: BN;
  votedNay: BN;
  votedTotal: BN;
}

export interface DeriveReferendumVotes extends DeriveReferendumVoteState {
  isPassing: boolean;
  votes: DeriveReferendumVote[];
}

export interface DeriveReferendumExt extends DeriveReferendum, DeriveReferendumVotes {
}
