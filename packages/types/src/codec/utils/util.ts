// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isFunction } from '@5ire/util';

export function hasEq (o: unknown): o is { eq: (other: unknown) => boolean } {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return isFunction((o as any).eq);
}
