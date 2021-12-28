// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from '@5ire/types/metadata';
import type { DecoratedMeta } from '@5ire/types/metadata/decorate/types';
import type { Text } from '@5ire/types/primitive';
import type { Registry } from '@5ire/types/types';
import type { BN } from '@5ire/util';
import type { ApiDecoration, ApiTypes } from '../types';

export interface VersionedRegistry<ApiType extends ApiTypes> {
  decoratedApi?: ApiDecoration<ApiType>;
  decoratedMeta?: DecoratedMeta;
  isDefault?: boolean;
  lastBlockHash?: Uint8Array | null;
  metadata: Metadata;
  registry: Registry;
  specName: Text;
  specVersion: BN;
}
