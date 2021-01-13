module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|gif|png|woff|ttf|svg)$': 'identity-obj-proxy',
    // Spin.js contains es6 imports in its dist code 🤦‍♂️
    'spin.js': 'identity-obj-proxy',
  },
  roots: ['./src'],
}
