export const IFRAME_SELECTOR = '[data-qa="iframe"]'
export const screenSizeDesktop = { width: 1024, height: 768 }
export const screenSizeMobile = { width: 375, height: 667 }

const getIframeBody = (iframe) => {
  return cy
    .get(iframe)
    .its('0.contentDocument.body').should('not.be.empty') // retry until the body element is not empty
    .then(cy.wrap) // wrap "body" DOM element to allow chaining more Cypress commands
}

export const getIframe = (iframe, callbackWithIframeBody, callbackWithIframe) => {
  if (Cypress.isBrowser('chrome')) {
    callbackWithIframeBody(getIframeBody(iframe))
  } else if (callbackWithIframe) {
    callbackWithIframe(cy.get(iframe))
  }
}

export const testEmbeddedForm = (selector = IFRAME_SELECTOR) => {
  getIframe(
    selector,
    iframeBody => iframeBody.find('[data-qa="start-button"]').should('have.text', 'Start').should('be.visible'),
    iframe => iframe.should('be.visible')
  )
}

export const openPopup = (mode) => {
  cy.get(`[data-mode="${mode}"]`).click()
  cy.get(IFRAME_SELECTOR).should('not.be.undefined')
}

export const closePopupViaButton = () => {
  cy.get('[data-qa="popup-close-button"]').click()
  cy.get(IFRAME_SELECTOR).should('not.exist')
}

export const closePopupViaButtonOnMobile = () => {
  cy.get('[data-qa="close-button-mobile"]').click()
  cy.get(IFRAME_SELECTOR).should('not.exist')
}

export const closePopupViaKeyboard = () => {
  getIframe(
    IFRAME_SELECTOR,
    iframeBody => {
      iframeBody.find('[data-qa="start-button"]').type('{esc}') // send escape key to iframe
      cy.get(IFRAME_SELECTOR).should('not.exist')
    },
    () => closePopupViaButton()
  )
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
  getIframe(
    IFRAME_SELECTOR,
    iframeBody => {
      iframeBody.find('[data-qa="start-button"]').click()

      // on mobile there are 2 iframes when the form is opened in modal window
      cy.get(IFRAME_SELECTOR).should('have.length', 2)

      cy.get('[data-qa="close-button-mobile"]').click()
      cy.get(IFRAME_SELECTOR).should('have.length', 1)
    },
    iframe => iframe.should('be.visible')
  )
}

export const waitForEmbed = (wait = 0) => {
  cy.title().should('eq', 'form-ready')
  cy.wait(wait) // short waiting time to make sure the form is loaded
}
