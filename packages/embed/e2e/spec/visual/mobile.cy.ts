import { openOnMobile, waitForAnimations } from '../../cypress-utils'

const embeds = [
  { name: 'Popover', page: '/popover-js.html', trigger: '#button' },
  { name: 'Popup', page: '/popup-js.html', trigger: '#button' },
  { name: 'Sidetab', page: '/sidetab-js.html', trigger: 'button.tf-v1-sidetab-button' },
  { name: 'Slider', page: '/slider-js.html', trigger: '#button' },
]

describe('Mobile Embeds', () => {
  embeds.forEach(({ name, page, trigger }) => {
    it(`${name} fullscreen`, () => {
      openOnMobile(page)
      cy.get(trigger).click({ force: true })
      waitForAnimations()
      cy.get('[data-testid="iframe"]').should('be.visible')
      cy.vrt(`${name} Mobile`)
    })
  })
})
