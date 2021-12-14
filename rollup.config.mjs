// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@5ire/dev/config/rollup';

const pkgs = [
  'api',
  'api-contract',
  'types'
];

const external = [
  ...pkgs,
  'keyring',
  'util',
  'util-crypto'
];

const entries = ['api-derive', 'rpc-core', 'rpc-provider', 'types-known'].reduce((all, p) => ({
  ...all,
  [`${p}`]: path.resolve(process.cwd(), `packages/${p}/build/bundle.js`)
}), {
  // re-exported in @polkadot/util-crypto, map directly
  'networks': 'util-crypto'
});

const overrides = {};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
