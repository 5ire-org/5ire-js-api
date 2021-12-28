// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as deriveInfo } from '@5ire/api-derive/packageInfo';
import { packageInfo as coreInfo } from '@5ire/rpc-core/packageInfo';
import { packageInfo as providerInfo } from '@5ire/rpc-provider/packageInfo';
import { packageInfo as typesInfo } from '@5ire/types/packageInfo';
import { packageInfo as knownInfo } from '@5ire/types-known/packageInfo';
import { detectPackage } from '@5ire/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [deriveInfo, coreInfo, providerInfo, typesInfo, knownInfo]);
