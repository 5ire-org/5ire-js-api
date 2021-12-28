// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as apiInfo } from '@5ire/api/packageInfo';
import { packageInfo as coreInfo } from '@5ire/rpc-core/packageInfo';
import { packageInfo as typesInfo } from '@5ire/types/packageInfo';
import { detectPackage } from '@5ire/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [apiInfo, coreInfo, typesInfo]);
