module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',

    // React Hooks rules.
    'react-hooks',
  ],
  rules: {
    /*= ============================================
    =            Solving remaining problems        =
    ============================================= */

    // Problem: “‘react/jsx-filename-extension”
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],

    // Problem: “import/extensions”
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    // Problem: “no-shadow”.
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    '@typescript-eslint/no-non-null-assertion': 'off',

    /*= ====  End of Solving remaining problems ====== */

    /*= ============================================
    =            Some nice rules to apply.         =
    ============================================= */

    // Force all functions have explicit return type.
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],

    // Max length of line code.
    // 'max-len': ['warn', { code: 80 }],

    // React Hooks rules.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /*= ====  End of Some nice rules to apply.  ====== */
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  // More rules can be found here:
  // https://andrebnassis.medium.com/
  // setting-eslint-on-a-react-typescript-project-2021-1190a43ffba
};
