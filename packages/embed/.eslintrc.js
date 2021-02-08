module.exports = {
  extends: ['@typeform/eslint-config', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
  rules: {
    'no-restricted-imports': ['error', { patterns: ['./../*'] }], // do not use unnecessary leading `./`
  },
}
