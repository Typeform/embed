/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { addVisualRegressionTrackerPlugin } from '@visual-regression-tracker/agent-cypress/dist/plugin'

const setupNodeEvents: Cypress.PluginConfig = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    log(message: string) {
      console.log(message)
      return null
    },
  })

  if (config.env.testType === 'visual') {
    addVisualRegressionTrackerPlugin(on, config)

    // Headless Chrome opens a small window, so Cypress shrinks the viewport (667px -> 577px) and shows
    // scrollbars. Use a window big enough for the largest spec viewport, at 1x, so screenshots are stable.
    on('before:browser:launch', (browser, launchOptions) => {
      if (browser.family === 'chromium' && browser.name !== 'electron') {
        launchOptions.args.push('--window-size=1400,1200', '--force-device-scale-factor=1', '--hide-scrollbars')
      }
      return launchOptions
    })
  }
}

export default setupNodeEvents
