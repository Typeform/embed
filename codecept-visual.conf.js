require('dotenv').config()

const selenium = require('selenium-standalone')

let seleniumChild = null

const capabilities = {
  chrome: {
    chromeOptions: {
      args: [
        '--headless',
        '--disable-extensions',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    }
  },
  firefox: {
    'moz:firefoxOptions': { args: ['-headless'] }
  }
}

exports.config = {
  tests: './e2e/visual/*.js',
  output: './e2e/output',
  include: {
    I: './e2e/custom-steps.js'
  },
  desiredCapabilities: {
    // close all unexpected popups
    unexpectedAlertBehaviour: 'dismiss'
  },
  helpers: {
    WebDriver: {
      smartWait: 5000,
      url: process.env.URL || 'http://localhost:8080',
      browser: process.profile || 'chrome',
      host: '127.0.0.1',
      port: 4444,
      path: '/wd/hub',
      restart: false,
      desiredCapabilities: capabilities[process.profile] || capabilities.chrome,
      windowSize: '1200x825'
    },
    ApplitoolsHelper: {
      require: './e2e/visual-helper.js'
    }
  },
  bootstrap: done => {
    selenium.start((error, child) => {
      if (error) {
        throw error
      }
      console.log('Selenium standalone server launched')
      seleniumChild = child
      done()
    })
  },
  teardown: done => {
    setTimeout(() => {
      try {
        if (seleniumChild) {
          seleniumChild.kill()
          console.log('Selenium standalone server killed')
        }
      } catch (e) {}
    }, 3000)
    done()
  },
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
}
