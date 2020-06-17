module.exports = {
  'setupFiles': [
    './test/setup.js'
  ],
  'transform': {
    '.*': 'babel-jest'
  },
  'testEnvironment': 'node',
  'moduleNameMapper': {
    '^.+\\.(css|gif|png|woff|ttf|svg)$': 'identity-obj-proxy'
  },
  'roots': [
    './src'
  ]
}
