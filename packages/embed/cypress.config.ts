import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  screenshotsFolder: './e2e/screenshots',
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280,
  viewportHeight: 1000,
  animationDistanceThreshold: 2,
  video: false,
  e2e: {
    supportFile: false,
    specPattern: './e2e/spec/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:9090/',
  },
})
