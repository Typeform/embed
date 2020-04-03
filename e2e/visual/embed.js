const { resizeWindow } = require('../codeceptjs-utils')

const clickOnLink = (I, n = 1) => {
  const cssLinkSelector = `[data-mode="${n}"]`
  I.click({ css: cssLinkSelector })
}

Feature('Embed Widget')

Scenario('Basic Widget', async (I) => {
  I.amOnPage('widget.html')
  I.waitForVisible({ css: 'iframe' }, 5)
  await I.eyesCheck('Embed Basic Widget')
})

Scenario('Full Page Widget', async (I) => {
  I.amOnPage('full.html')
  I.waitForVisible({ css: 'iframe' }, 5)
  await I.eyesCheck('Embed Full Page Widget')
})

Scenario('Basic Widget on Mobile', async (I) => {
  resizeWindow(I)
  I.amOnPage('widget.html')
  await I.eyesCheck('Embed Basic Widget - Mobile')
})

Scenario('Full Page Widget on Mobile', async (I) => {
  resizeWindow(I)
  I.amOnPage('full.html')
  await I.eyesCheck('Embed Full Page Widget - Mobile')
})

Scenario('Popup Widget', async (I) => {
  I.amOnPage('popup.html')
  clickOnLink(I, 1)
  I.waitForVisible({ css: 'iframe' }, 10)
  await I.eyesCheck('Popup Widget')
})

Scenario('Popup Widget on Mobile', async (I) => {
  resizeWindow(I)
  I.amOnPage('popup.html')
  clickOnLink(I, 1)
  await I.eyesCheck('Popup Widget')
})

Scenario('Drawer Widget', async (I) => {
  I.amOnPage('popup.html')
  clickOnLink(I, 2)
  I.waitForVisible({ css: 'iframe' }, 10)
  await I.eyesCheck('Drawer Widget')
})

Scenario('Drawer Widget on Mobile', async (I) => {
  resizeWindow(I)
  I.amOnPage('popup.html')
  clickOnLink(I, 2)
  await I.eyesCheck('Drawer Widget - Mobile')
})

Scenario('Right Drawer Widget', async (I) => {
  I.amOnPage('popup.html')
  clickOnLink(I, 3)
  I.waitForVisible({ css: 'iframe' }, 10)
  await I.eyesCheck('Popup Widget')
})

Scenario('Right Drawer Widget on Mobile', async (I) => {
  resizeWindow(I)
  I.amOnPage('popup.html')
  clickOnLink(I, 3)
  await I.eyesCheck('Right Drawer Widget - Mobile')
})
