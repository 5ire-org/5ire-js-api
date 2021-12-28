// Copyright 2017-2021 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { packageInfo as apiInfo } from '@5ire/api/packageInfo';
import { packageInfo as providerInfo } from '@5ire/rpc-provider/packageInfo';
import { packageInfo as typesInfo } from '@5ire/types/packageInfo';
import { detectPackage } from '@5ire/util';

import { packageInfo } from './packageInfo';

detectPackage(packageInfo, typeof __dirname !== 'undefined' && __dirname, [apiInfo, providerInfo, typesInfo]);
