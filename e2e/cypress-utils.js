export const IFRAME_SELECTOR = '[data-qa="iframe"]'
export const screenSizeDesktop = { width: 1024, height: 768 }
export const screenSizeMobile = { width: 375, height: 667 }

const getIframeBody = (iframe) => {
  return cy
    .get(iframe)
    .its('0.contentDocument.body').should('not.be.empty') // retry until the body element is not empty
    .then(cy.wrap) // wrap "body" DOM element to allow chaining more Cypress commands
}

export const testEmbeddedForm = (selector = IFRAME_SELECTOR) => {
  getIframeBody(selector)
    .find('[data-qa="start-button"]')
    .should('have.text', 'Start')
    .should('be.visible')
}

export const openPopup = (selector) => {
  cy.get(selector).click()
  cy.get(IFRAME_SELECTOR).should('be.visible')
}

export const closePopupViaButton = (selector = '[data-qa="popup-close-button"]') => {
  cy.get(selector).click()
  cy.get(IFRAME_SELECTOR).should('not.exist')
}

export const closePopupViaButtonOnMobile = () => {
  cy.get('[data-qa="close-button-mobile"]').click()
  cy.get(IFRAME_SELECTOR).should('not.exist')
}

export const closePopupViaKeyboard = () => {
  getIframeBody(IFRAME_SELECTOR)
    .find('[data-qa="form-input"]')
    .type('{esc}', { force: true }) // input is hidden, force the "esc" key
  cy.get(IFRAME_SELECTOR).should('not.exist')
}

const setViewport = ({ width, height }) => {
  cy.viewport(width, height)
}

export const open = (url) => {
  setViewport(screenSizeDesktop)
  cy.visit(url)
}

export const openOnMobile = (url) => {
  setViewport(screenSizeMobile)
  cy.visit(url, {
    onBeforeLoad: win => {
      Object.defineProperty(win.navigator, 'userAgent', {
        value: 'Cypress mobile browser'
      })
    }
  })
}

export const testEmbedFormOnMobile = () => {
  getIframeBody(IFRAME_SELECTOR).find('[data-qa="start-button"]').click()

  // on mobile there are 2 iframes when the form is opened in modal window
  cy.get(IFRAME_SELECTOR).should('have.length', 2)

  cy.get('[data-qa="close-button-mobile"]').click()
  cy.get(IFRAME_SELECTOR).should('have.length', 1)
}

export const waitForEmbed = () => {
  cy.title().should('eq', 'form-ready')
  cy.wait(500) // wait for the animation to finish
}
