// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, Balance, BalanceLockTo212, Index } from '@5ire/types/interfaces';
import type { PalletBalancesBalanceLock } from '@5ire/types/lookup';
import type { BN } from '@5ire/util';

export interface DeriveBalancesAccountData {
  freeBalance: Balance;
  frozenFee: Balance;
  frozenMisc: Balance;
  reservedBalance: Balance;
  votingBalance: Balance;
}

export interface DeriveBalancesAccount extends DeriveBalancesAccountData {
  accountId: AccountId;
  accountNonce: Index;
  additional: DeriveBalancesAccountData[];
}

export interface DeriveBalancesAllAccountData extends DeriveBalancesAccountData {
  availableBalance: Balance;
  lockedBalance: Balance;
  lockedBreakdown: (PalletBalancesBalanceLock | BalanceLockTo212)[];
  vestingLocked: Balance;
}

export interface DeriveBalancesVesting {
  startingBlock: BN;
  endBlock: BN;
  perBlock: BN;
  locked: BN;
  vested: BN;
}

export interface DeriveBalancesAllVesting {
  isVesting: boolean;
  vestedBalance: BN;
  vestedClaimable: BN;
  vesting: DeriveBalancesVesting[];
  vestingTotal: BN;
}

export interface DeriveBalancesAll extends DeriveBalancesAccount, DeriveBalancesAllAccountData, DeriveBalancesAllVesting {
  additional: DeriveBalancesAllAccountData[];
}

export type DeriveBalancesMap = Record<string, DeriveBalancesAll>;
