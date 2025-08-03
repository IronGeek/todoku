import { defineConfig, globalIgnores } from 'eslint/config';

import plugin from '@kikari/eslint-plugin';

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType : 'module',

      globals: {
        ...plugin.globals.browser,
        ...plugin.globals.node
      }
    }
  },
  {
    files  : ['**/*.js'],
    plugins: { '@kikari': plugin },

    extends: ['@kikari/js', '@kikari/import', '@kikari/style', '@kikari/next']
  },
  {
    files  : ['**/*.ts', '**/*.tsx'],
    plugins: { '@kikari': plugin },

    extends: ['@kikari/js', '@kikari/ts', '@kikari/import', '@kikari/style', '@kikari/next']
  },
  {
    files  : ['**/*.tsx'],
    plugins: { '@kikari': plugin },

    extends: ['@kikari/react', '@kikari/react:hooks', '@kikari/react:query']
  },
  globalIgnores([
    '**/~*',
    '.husky',
    'next-env.d.ts',
    'src/lib/prisma',
    'dist'
  ])
]);
