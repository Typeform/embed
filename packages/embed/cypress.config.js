const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  screenshotsFolder: './e2e/screenshots',
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280,
  viewportHeight: 1000,
  animationDistanceThreshold: 2,
  video: false,
  eyesIsDisabled: false,
  eyesFailCypressOnDiff: true,
  eyesDisableBrowserFetching: false,
  eyesPort: 61632,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: './e2e/spec/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:9090/',
  },
})
