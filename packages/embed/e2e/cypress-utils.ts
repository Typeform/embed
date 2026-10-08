export type Viewport = {
  width: number
  height: number
}

const screenSizeDesktop: Viewport = { width: 1024, height: 768 }
const screenSizeMobile: Viewport = { width: 375, height: 667 }

const setViewport = ({ width, height }: Viewport) => {
  cy.viewport(width, height)
}

export const open = (url: string) => {
  setViewport(screenSizeDesktop)
  cy.visit(url)
}

export const openOnMobile = (url: string) => {
  setViewport(screenSizeMobile)
  cy.visit(url, {
    onBeforeLoad: (win) => {
      Object.defineProperty(win.navigator, 'userAgent', {
        value: 'cypress mobile browser',
      })
      Object.defineProperty(win.screen, 'width', {
        value: screenSizeMobile.width,
      })
      Object.defineProperty(win.screen, 'height', {
        value: screenSizeMobile.height,
      })
    },
  })
}

// Clicks the form's welcome screen button until the widget goes fullscreen (close button visible).
// The button exists before the form's handlers are attached, so a single click can be lost; and it
// can be scrolled out of the iframe viewport, hence `force`.
export const startWidgetOnMobile = (attempts = 5) => {
  cy.get('iframe').then(($iframe) => {
    const $body = $iframe.contents().find('body')
    cy.wrap($body).find('[data-qa="ok-button"]').click({ force: true })
  })
  cy.wait(1000)
  cy.get('.tf-v1-widget-close').then(($close) => {
    if (!$close.is(':visible') && attempts > 1) {
      startWidgetOnMobile(attempts - 1)
    }
  })
}
