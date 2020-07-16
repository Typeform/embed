import {
  closePopupViaButton,
  open,
  openPopup,
  closePopupViaKeyboard,
  closePopupViaButtonOnMobile,
  IFRAME_SELECTOR,
  openOnMobile
} from '../../cypress-utils'

const popupModes = {
  popup: 'Popup',
  drawer_left: 'Drawer Left',
  drawer_right: 'Drawer Right',
  popover: 'Popover',
  side_panel: 'Side Panel'
}

const pages = {
  '/popup.html': 'embed code',
  '/popup-api.html': 'API'
}

Object.keys(popupModes).forEach(popupMode => {
  describe(`${popupModes[popupMode]} Embed Widget`, () => {
    Object.keys(pages).forEach(pageUrl => {
      describe(`Embedded using ${pages[pageUrl]} (at ${pageUrl})`, () => {
        describe('Desktop', () => {
          before(() => {
            open(pageUrl)
            openPopup(`#btn-${popupMode}`)
          })

          it('Passes hidden field parameter', () => {
            cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
          })

          it('Closes Embed Popup clicking on the close button', () => {
            if (popupMode === 'popover' || popupMode === 'side_panel') {
              closePopupViaButton(`#btn-${popupMode}`) // no close button, popup closes via the button that opened it
            } else {
              closePopupViaButton()
            }
          })

          it('Closes Embed Popup using Keyboard', () => {
            openPopup(`#btn-${popupMode}`)
            if (popupMode === 'popover' || popupMode === 'side_panel') {
              closePopupViaKeyboard(`#btn-${popupMode}`) // close button is used as fallback in firefox
            } else {
              closePopupViaKeyboard()
            }
          })
        })

        describe('Mobile', () => {
          before(() => {
            openOnMobile(pageUrl)
            openPopup(`#btn-${popupMode}`)
          })

          it('Closes Embed Popup clicking on close Button', () => {
            closePopupViaButtonOnMobile()
          })
        })
      })
    })
  })
})
