const { Eyes, Target, BatchInfo } = require('@applitools/eyes-webdriverio')
const { helper: Helper, event } = require('codeceptjs')
// const { ConsoleLogHandler } = require('@applitools/eyes-sdk-core')

const eyes = new Eyes()

class ApplitoolsHelper extends Helper {
  constructor (config) {
    super(config)
    eyes.setApiKey(process.env.EYES_API_KEY)
    this.appName = 'Embed Widget'
    const batchInfo = new BatchInfo(this.appName)
    eyes.setBatch(batchInfo)
  }

  async _before (test) {
    const windowSize = this.setWindowSize(this.helpers['WebDriver'].config)
    const browser = this.helpers['WebDriver'].browser
    // TODO Is this useful or makes tests more noisy?
    // Print logs to console
    // but makes the build noisy with a lot of logging events might makes it hard to read in Travis

    // eyes.setLogHandler(new ConsoleLogHandler(true))

    await eyes.open(browser, this.appName, test.title, windowSize)
  }

  setWindowSize (webDriverConfig) {
    if (webDriverConfig.windowSize) {
      return this.parseWindowSize(webDriverConfig)
    }
    return { width: 800, height: 600 }
  }

  parseWindowSize (config) {
    const windowSize = config.windowSize.split('x')
    return {
      width: parseInt(windowSize[0], 10),
      height: parseInt(windowSize[1], 10)
    }
  }

  async eyesCheck (pageName) {
    await eyes.check(pageName, Target.window())
    await eyes.close()
    await eyes.abortIfNotClosed()
  }

  // Once visual tests have finished it takes Applitools more than
  // 3 minutes to sent the exit code. So below the exit is forced
  // as soon as Codecept tests results are printed.
  // Forcing exit code to 0 because Applitools github integration will make
  // the github status check fail if visuals fail
  _afterSuite () {
    event.dispatcher.on(event.all.result, () => {
      process.exit(0)
    })
  }
}

module.exports = ApplitoolsHelper
