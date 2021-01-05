module.exports = {
  extends: [
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'], // 兼容src目录下的子目录路径简写，否则会报 import/extensions
      },
    },
  },
  globals: {
    Raven: true,
    wx:true,
  },
  rules: {
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'no-restricted-syntax': 0,
    'import/extensions': 1,
    'linebreak-style': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'space-before-function-paren': 0,
    'no-debugger': 0,
    'no-prototype-builtins': 0,
    'no-await-in-loop': 0,
    'no-multi-assign': 0,
    'prefer-promise-reject-errors': 0,
    camelcase: 0,
    'no-restricted-globals':0,
    'no-unused-vars': 1,
  },
};
