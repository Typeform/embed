import { screenSizeDesktop, screenSizeMobile, Viewport } from './cypress-utils'

const eyesCheck = async (name: string, { width, height }: Viewport) => {
  cy.eyesOpen({
    appName: 'Embed - Cypress',
    ignoreCaret: true,
    browser: {
      width,
      height,
      name: Cypress.browser.name,
    } as any,
    batchName: 'Embed',
  })
  cy.eyesCheckWindow(name)
  cy.eyesClose()
}

export const eyesCheckDesktop = (name: string) => eyesCheck(name, screenSizeDesktop)

export const eyesCheckMobile = (name: string) => eyesCheck(name, screenSizeMobile)
