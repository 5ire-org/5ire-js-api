// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u8 } from '@5ire/types';
import type { Balance, Perbill } from '@5ire/types/interfaces/runtime';

/** @name WeightToFeeCoefficient */
export interface WeightToFeeCoefficient extends Struct {
  readonly coeffInteger: Balance;
  readonly coeffFrac: Perbill;
  readonly negative: bool;
  readonly degree: u8;
}

export type PHANTOM_SUPPORT = 'support';
