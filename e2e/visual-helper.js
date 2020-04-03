const { Eyes, Target, BatchInfo } = require('@applitools/eyes-webdriverio')
const { helper: Helper } = require('codeceptjs')

class ApplitoolsHelper extends Helper {
  constructor (config) {
    super(config)
    this.eyes = new Eyes()
    this.eyes.setApiKey(process.env.EYES_API_KEY)
    this.appName = 'Embed Widget'
    const batchInfo = new BatchInfo(this.appName)
    this.eyes.setBatch(batchInfo)
  }

  async _before (test) {
    const windowSize = this.setWindowSize(this.helpers['WebDriver'].config)
    const browser = this.helpers['WebDriver'].browser
    await this.eyes.open(browser, this.appName, test.title, windowSize)
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
    await this.eyes.check(pageName, Target.window())
    await this.eyes.close()
  }
}

module.exports = ApplitoolsHelper
