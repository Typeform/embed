const DOM = require('./codeceptjs-utils').DOMSelectors

/**
 * Extends CodeCept Object with custom step
 * Verify that the IFrame exists and is loaded
 * @param {String} element DOM selector String
 */

const { frame, progressBar } = DOM
const popUrl = 'popup.html'

module.exports = function () {
  return actor({

    verifyIframeIsLoaded (element) {
      this.waitForVisible(frame, 5)
      within({ frame }, () => {
        this.seeElement(progressBar)
        this.seeElement(element)
      })
    },
    loadPopup (link) {
      this.amOnPage(popUrl)
      this.click(`[data-mode="${link}"]`)
    },
    // For Visual Tests requires more waiting time
    waitForVisualElement (cssLocator) {
      this.waitForVisible({ css: cssLocator }, 10)
    },
    async waitForIFrameMessage () {
      this.executeAsyncScript(function (done) {
        const interval = setInterval(function () {
          if (window.document.title === 'form-ready') {
            clearInterval(interval)
            done()
          }
        }, 100)
      })
    }
  })
}
