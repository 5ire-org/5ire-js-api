// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct } from '@5ire/types';
import type { AccountId, BlockNumber, Hash } from '@5ire/types/interfaces/runtime';

/** @name ProxyAnnouncement */
export interface ProxyAnnouncement extends Struct {
  readonly real: AccountId;
  readonly callHash: Hash;
  readonly height: BlockNumber;
}

/** @name ProxyDefinition */
export interface ProxyDefinition extends Struct {
  readonly delegate: AccountId;
  readonly proxyType: ProxyType;
  readonly delay: BlockNumber;
}

/** @name ProxyType */
export interface ProxyType extends Enum {
  readonly isAny: boolean;
  readonly isNonTransfer: boolean;
  readonly isGovernance: boolean;
  readonly isStaking: boolean;
}

export type PHANTOM_PROXY = 'proxy';
