// Copyright 2017-2021 @polkadot/api-contract authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiBase } from '@5ire/api/base';
import { TypeRegistry } from '@5ire/types';

const registry = new TypeRegistry();

export const mockApi = {
  isConnected: true,
  registry,
  tx: {
    contracts: {
      instantiateWithCode: (): never => {
        throw new Error('mock');
      }
    }
  }
} as unknown as ApiBase<'promise'>;
