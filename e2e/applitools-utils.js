import { screenSizeDesktop, screenSizeMobile } from './cypress-utils'

const eyesCheck = (name, mobile) => {
  const { width, height } = mobile ? screenSizeMobile : screenSizeDesktop

  cy.eyesOpen({
    appName: 'Embed Widget - Cypress',
    ignoreCaret: true,
    browser: {
      width,
      height,
      name: Cypress.browser.name
    }
  })
  cy.eyesCheckWindow(name)
  cy.eyesClose()
}

export const eyesCheckDesktop = (name) => eyesCheck(name, false)

export const eyesCheckMobile = (name) => eyesCheck(name, true)
