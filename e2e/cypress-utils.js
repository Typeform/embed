/**
 * Wait for the Iframe to load and verify it exists
 * @param {Sting} iframe CSS selector
 */

const getIframeDocument = (iframe) => {
  return cy
    .get(iframe)
    .its('0.contentDocument').should('exist')
}

/**
 *
 * @param {String} iframe CSS selector
 */
export const getIframeBody = (iframe) => {
  // get the document
  return getIframeDocument(iframe)
    // automatically retries until body is loaded
    .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap)
}
/**
 * Basic test for checking iframe and its elements are loaded
 * We verify that the foote of the typeform is loaded
 * @param {String} iframe CSS Selector for IFrame
 */

export const setupIframeTesting = (iframe) => {
  // Cross browser origin will block all tests inside iframes
  // We can only use it inside Chrome disabling web security --> see config
  // Won't work in popups
  if (Cypress.isBrowser('chrome')) {
    getIframeBody(iframe).find('[data-qa="start-button"]').should('be.visible')
  } else {
    cy.get(iframe).should('be.visible')
  }
}

/**
 * @param {Object} popup the popup Object
 * @param {number} popup.link the link [data-mode] to click
 * @param {boolean} [popup.hasKeyboardEvent] if uses keyboard for closing the popup
 * @param {Boolean} [popup.isMobile] Runs the test on Mobile
 */

const IFRAME = '[data-qa="iframe"]'

export const setupPopupTesting = (popup) => {
  const { link, hasKeyboardEvent, isMobile } = popup
  cy.visit('popup.html')
  if (isMobile) {
    cy.viewport('iphone-6')
  }
  cy.get(`[data-mode="${link}"]`).click()
  // TODO find a fix for testing iframe in firefox
  // We cannot test the keyboard event in firefox
  // As it will block any action inside the iframe
  if (hasKeyboardEvent && Cypress.isBrowser('chrome')) {
    // give some extra safe time to load
    // because we cannot wait inside Iframe for popups
    cy.wait(2000).then(() => {
      getIframeBody(IFRAME).then(($body) => {
        const iframeBody = cy.wrap($body)
        iframeBody.find('button')
          .focus()
          .type('{esc}')
      })
    })
  } else {
    getIframeBody(IFRAME).should('not.be.undefined') // IFrame exists
    cy.get('[data-qa="popup-close-button"]').click({ log: true, timeout: 5000 }) // Close Iframe
  }
  cy.get(IFRAME).should('not.exist') // IFrame is removed from DOM
}

export const openAsMobile = (url) => {
  cy.viewport('iphone-6')
  cy.visit(url, {
    onBeforeLoad: win => {
      Object.defineProperty(win.navigator, 'userAgent', {
        value: 'Cypress mobile browser'
      })
    }
  })
}
