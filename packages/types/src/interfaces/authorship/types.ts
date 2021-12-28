// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Option } from '@5ire/types';
import type { AccountId, BlockNumber, Hash } from '@5ire/types/interfaces/runtime';
import type { ITuple } from '@5ire/types/types';

/** @name UncleEntryItem */
export interface UncleEntryItem extends Enum {
  readonly isInclusionHeight: boolean;
  readonly asInclusionHeight: BlockNumber;
  readonly isUncle: boolean;
  readonly asUncle: ITuple<[Hash, Option<AccountId>]>;
}

export type PHANTOM_AUTHORSHIP = 'authorship';
