// Copyright 2017-2021 @polkadot/api-contract authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ContractMetadataLatest, ContractMetadataV0 } from '@5ire/types/interfaces';
import type { Registry } from '@5ire/types/types';

import { convertSiV0toV1 } from '@5ire/types';

export function toLatest (registry: Registry, v0: ContractMetadataV0): ContractMetadataLatest {
  return registry.createType('ContractMetadataLatest', {
    ...v0,
    types: convertSiV0toV1(registry, v0.types)
  });
}
