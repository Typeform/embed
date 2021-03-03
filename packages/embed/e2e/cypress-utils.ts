export type Viewport = {
  width: number
  height: number
}

export const screenSizeDesktop: Viewport = { width: 1024, height: 768 }
export const screenSizeMobile: Viewport = { width: 375, height: 667 }

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
        value: 'Cypress mobile browser',
      })
    },
  })
}
