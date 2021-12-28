// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { AccountId } from '@5ire/types/interfaces';

import { members as collectiveMembers } from '../collective';
import { memo } from '../util';

export function members (instanceId: string, api: ApiInterfaceRx): () => Observable<AccountId[]> {
  return memo(instanceId, collectiveMembers(instanceId, api, 'membership'));
}
