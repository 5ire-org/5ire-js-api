// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@5ire/api/types';
import type { AccountId, AccountIndex, Address } from '@5ire/types/interfaces';

import { map, of } from 'rxjs';

import { assertReturn, isU8a } from '@5ire/util';
import { decodeAddress } from '@polkadot/util-crypto';

import { memo } from '../util';

function retrieve (api: ApiInterfaceRx, address: Address | AccountId | AccountIndex | string | null | undefined): Observable<AccountId> {
  const decoded = isU8a(address)
    ? address
    : decodeAddress((address || '').toString());

  if (decoded.length > 8) {
    return of(api.registry.createType('AccountId', decoded));
  }

  const accountIndex = api.registry.createType('AccountIndex', decoded);

  return api.derive.accounts.indexToId(accountIndex.toString()).pipe(
    map((accountId) => assertReturn(accountId, 'Unable to retrieve accountId'))
  );
}

/**
 * @name accountId
 * @param {(Address | AccountId | AccountIndex | string | null)} address - An accounts address in various formats.
 * @description  An [[AccountId]]
 */
export function accountId (instanceId: string, api: ApiInterfaceRx): (address?: Address | AccountId | AccountIndex | string | null) => Observable<AccountId> {
  return memo(instanceId, (address?: Address | AccountId | AccountIndex | string | null): Observable<AccountId> =>
    retrieve(api, address));
}
