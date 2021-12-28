// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Struct } from '@5ire/types';
import type { BlockHash } from '@5ire/types/interfaces/chain';

/** @name MmrLeafProof */
export interface MmrLeafProof extends Struct {
  readonly blockHash: BlockHash;
  readonly leaf: Bytes;
  readonly proof: Bytes;
}

export type PHANTOM_MMR = 'mmr';
