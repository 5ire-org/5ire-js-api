// Copyright 2017-2021 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@5ire/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    '@5ire/api-(contract|derive)(.*)$': '<rootDir>/packages/api-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@5ire/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@polkadot/metadata(.*)$': '<rootDir>/packages/metadata/src/$1',
    '@5ire/rpc-(core|provider)(.*)$': '<rootDir>/packages/rpc-$1/src/$2',
    '@5ire/typegen(.*)$': '<rootDir>/packages/typegen/src/$1',
    '@5ire/types-(known|support)(.*)$': '<rootDir>/packages/types-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@5ire/types(.*)$': '<rootDir>/packages/types/src/$1'
  },
  testTimeout: 30000
};
