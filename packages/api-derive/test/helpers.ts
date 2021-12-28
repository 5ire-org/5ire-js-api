// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@5ire/api';
import { Metadata, TypeRegistry } from '@5ire/types';
import metaStatic from '@5ire/types-support/metadata/static-substrate';

export function createApiWithAugmentations (): ApiPromise {
  const registry = new TypeRegistry();
  const metadata = new Metadata(registry, metaStatic);

  registry.setMetadata(metadata);

  const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry });

  api.injectMetadata(metadata, true, registry);

  return api;
}
