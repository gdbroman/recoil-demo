module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  extends: [
    // Omit jsx-a11y until we want to solve those issues. To enable, add the full `airbnb` rule set.
    'airbnb-base',
    'airbnb/rules/react',
    'airbnb/rules/react-hooks',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    prettier: {
      singleQuote: true,
      semi: true,
      printWidth: 100,
      trailingComma: 'es5',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {},
    },
  },

  plugins: ['@typescript-eslint', 'prettier', 'react-hooks', 'import', 'eslint-comments'],

  rules: {
    'prettier/prettier': 'error',

    // The rule's defaults only allow JSX, not TSX.
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],

    // We're fine with TS inferring the return type, especially for render props.
    // Otherwise we get errors for things like <Container>{() => null}</Container>
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Disabled, creates alot of noise around stories & components.
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // ESLint misunderstands types and complains that they're unused.
    'no-undef': 'off',

    // Takes over the ESLint rule.
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

    // Prefer the TS version.
    'no-empty-function': 'off',
    // Allow `constructor(private foo: number) {}`
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],

    // Since React 17.0 it's no longer needed to import React when using JSX.
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // We're fine with this, especially since it's a common pattern for styled components.
    'react/jsx-props-no-spreading': 'off',

    // The base rule generates false positives, so we must use the TS rule.
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    'import/prefer-default-export': 'off', // Allow single Named-export
    'import/order': [
      'error',
      {
        groups: [
          // Node built-in types e.g. `path` and `fs`.
          'builtin',
          // npm deps e.g. `react` and `styled-components`.
          'external',
          // Aliased paths.
          // See https://github.com/benmosher/eslint-plugin-import/issues/1379#issuecomment-527466222.
          ['internal', 'unknown'],
          // Parent imports e.g. '../../foo'.
          'parent',
          // Sibling imports e.g. './foo` and `./bar/baz`.
          'sibling',
        ],
      },
    ],
    // Ignore having to explicitly name imports with file extensions, since we don't do: Component.css, Component.tsx
    'import/extensions': 'off',

    // We use types, never prop types.
    'react/prop-types': 'off',
    // defaultProps are only for class components, we use mostly function components
    // with default args and the rules is producing false positives in those cases.
    'react/require-default-props': 'off',
    // Gives false positives when the props are passed to other components/functions.
    'react/no-unused-prop-types': 'off',

    // We don't write a lot of class components so this provides little value.
    'react/sort-comp': 'off',

    // This rule throws an error when parsing some of our components.
    'react/static-property-placement': 'off',

    // Don't force destructuring for this.props.foo.bar.etc.
    'react/destructuring-assignment': 'off',

    // Allow binding callbacks in class components. It could have performance drawbacks,
    // but we don't have a lot of class components.
    'react/jsx-no-bind': 'off',
    // Allow state initialization via class fields.
    'react/state-in-constructor': 'off',

    // Some MUI components have props that differ only in case.
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],

    // Allow i++.
    'no-plusplus': 'off',

    // While this would be nice, we have a lot of cases where we currently do it.
    'no-param-reassign': 'off',

    // The base rule generates false positives.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // Prefer the TS one.
    camelcase: 'off',

    // Deprecated in favor of naming-convention.
    '@typescript-eslint/camelcase': 'off',

    // Many APIs have snake cased object properties and we can't do nothing about it.
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        // We use PascalCase for component parameters.
        // Unused parameters are ignored by noUnusedParameters if starting with an undercore.
        // https://github.com/microsoft/TypeScript/pull/9464
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'export', next: '*' },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx', '*.test.tsx', '*.test.ts'],
      rules: {
        // Don't care about translations in tests.
        'react/jsx-no-literals': 'off',
        // It's common to have empty functions in tests when you're not interested in exercising
        // e.g. a callback send to a component. It would be nicer to send a properly named mock
        // that will throw if called instead, but we already have a bunch of them at this point.
        '@typescript-eslint/no-empty-function': 'off',
        // It's OK to have minimalistic tests that don't have all props
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js'],
    },
  ],
};
