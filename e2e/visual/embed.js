const { resizeWindow } = require('../codeceptjs-utils')

const clickOnLink = async (I, n = 1) => {
  const cssLinkSelector = `[data-mode="${n}"]`
  await I.click({ css: cssLinkSelector })
}

const waitForIFrame = async (I) => {
  await I.waitForVisible({ css: 'iframe' }, WAITING_TIME)
  await I.waitForIFrameMessage()
}
const WAITING_TIME = 5

Feature('Embed Widget')

Scenario('Basic Widget @desktop', async (I) => {
  await I.amOnPage('widget.html')
  await waitForIFrame(I)
  await I.eyesCheck('Embed Basic Widget')
})

Scenario('Full Page Widget @desktop', async (I) => {
  await I.amOnPage('full.html')
  await waitForIFrame(I)
  await I.eyesCheck('Embed Full Page Widget')
})

Scenario('Basic Widget @mobile', async (I) => {
  await resizeWindow(I)
  await I.amOnPage('widget.html')
  await waitForIFrame(I)
  await I.eyesCheck('Embed Basic Widget - Mobile')
})

Scenario('Full Page Widget @mobile', async (I) => {
  await resizeWindow(I)
  await I.amOnPage('full.html')
  await waitForIFrame(I)
  await I.eyesCheck('Embed Full Page Widget - Mobile')
})

Scenario('Popup Widget @desktop', async (I) => {
  await I.amOnPage('popup.html')
  await clickOnLink(I, 1)
  await waitForIFrame(I)
  await I.eyesCheck('Popup Widget')
})

Scenario('Popup Widget @mobile', async (I) => {
  await resizeWindow(I)
  await I.amOnPage('popup.html')
  await clickOnLink(I, 1)
  await waitForIFrame(I)
  await I.eyesCheck('Popup Widget')
})

Scenario('Drawer Widget @desktop', async (I) => {
  await I.amOnPage('popup.html')
  await clickOnLink(I, 2)
  await waitForIFrame(I)
  await I.eyesCheck('Drawer Widget')
})

Scenario('Drawer Widget @mobile', async (I) => {
  await resizeWindow(I)
  await I.amOnPage('popup.html')
  await clickOnLink(I, 2)
  await waitForIFrame(I)
  await I.eyesCheck('Drawer Widget - Mobile')
})

Scenario('Right Drawer Widget @desktop', async (I) => {
  await I.amOnPage('popup.html')
  await clickOnLink(I, 3)
  await waitForIFrame(I)
  await I.eyesCheck('Popup Widget')
})

Scenario('Right Drawer Widget @mobile', async (I) => {
  await resizeWindow(I)
  await I.amOnPage('popup.html')
  await clickOnLink(I, 3)
  await waitForIFrame(I)
  await I.eyesCheck('Right Drawer Widget - Mobile')
})
