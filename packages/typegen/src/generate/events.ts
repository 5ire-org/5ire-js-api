// Copyright 2017-2021 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Metadata } from '@5ire/types/metadata/Metadata';
import type { ExtraTypes } from './types';

import Handlebars from 'handlebars';

import lookupDefinitions from '@5ire/types/augment/lookup/definitions';
import * as defaultDefs from '@5ire/types/interfaces/definitions';
import { stringCamelCase } from '@5ire/util';

import { compareName, createImports, formatType, initMeta, readTemplate, setImports, writeFile } from '../util';

const template = readTemplate('events');
const generateForMetaTemplate = Handlebars.compile(template);

/** @internal */
function generateForMeta (meta: Metadata, dest: string, extraTypes: ExtraTypes, isStrict: boolean): void {
  writeFile(dest, (): string => {
    const allTypes = {
      '@5ire/types/augment': { lookup: lookupDefinitions },
      '@5ire/types/interfaces': defaultDefs,
      ...extraTypes
    };
    const imports = createImports(allTypes);
    const allDefs = Object.entries(allTypes).reduce((defs, [path, obj]) => {
      return Object.entries(obj).reduce((defs, [key, value]) => ({ ...defs, [`${path}/${key}`]: value }), defs);
    }, {});
    const { lookup, pallets, registry } = meta.asLatest;
    const modules = pallets
      .filter(({ events }) => events.isSome)
      .map(({ events, name }) => ({
        items: lookup.getSiType(events.unwrap().type).def.asVariant.variants
          .map(({ docs, fields, name }) => {
            const args = fields
              .map(({ type }) => lookup.getTypeDef(type))
              .map((typeDef) => typeDef.lookupName || formatType(registry, allDefs, typeDef, imports));

            setImports(allDefs, imports, args);

            return {
              docs,
              name: name.toString(),
              type: args.join(', ')
            };
          })
          .sort(compareName),
        name: stringCamelCase(name)
      }))
      .sort(compareName);

    return generateForMetaTemplate({
      headerType: 'chain',
      imports,
      isStrict,
      modules,
      types: [
        ...Object.keys(imports.localTypes).sort().map((packagePath): { file: string; types: string[] } => ({
          file: packagePath.replace('@5ire/types/augment', '@5ire/types'),
          types: Object.keys(imports.localTypes[packagePath])
        })),
        {
          file: '@5ire/api/types',
          types: ['ApiTypes']
        }
      ]
    });
  });
}

// Call `generateForMeta()` with current static metadata
/** @internal */
export function generateDefaultEvents (dest = 'packages/api/src/augment/events.ts', data?: string, extraTypes: ExtraTypes = {}, isStrict = false): void {
  const { metadata } = initMeta(data, extraTypes);

  return generateForMeta(metadata, dest, extraTypes, isStrict);
}
