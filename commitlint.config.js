module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [1, 'never'],
    'scope-case': [2, 'always', 'uppercase'],
    'subject-case': [2, 'always', 'sentencecase'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^([a-z]+)(\(\w{2,}-\d{1,}\))?: (\S+)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
}
