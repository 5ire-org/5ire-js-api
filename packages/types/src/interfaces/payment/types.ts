// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Option, Struct } from '@5ire/types';
import type { Balance, Weight } from '@5ire/types/interfaces/runtime';
import type { DispatchClass } from '@5ire/types/interfaces/system';

/** @name FeeDetails */
export interface FeeDetails extends Struct {
  readonly inclusionFee: Option<InclusionFee>;
}

/** @name InclusionFee */
export interface InclusionFee extends Struct {
  readonly baseFee: Balance;
  readonly lenFee: Balance;
  readonly adjustedWeightFee: Balance;
}

/** @name RuntimeDispatchInfo */
export interface RuntimeDispatchInfo extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
  readonly partialFee: Balance;
}

export type PHANTOM_PAYMENT = 'payment';
