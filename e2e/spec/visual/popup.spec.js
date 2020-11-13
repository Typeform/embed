import { open, openOnMobile, openPopup, waitForEmbed } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Popup Widget', () => {
  const popupModes = {
    popup: 'Popup',
    popup_s: 'Popup (small)',
    popup_xs: 'Popup (very small)',
    drawer_left: 'Drawer Left',
    drawer_right: 'Drawer Right',
    popover: 'Popover',
    side_panel: 'Side Panel'
  }

  Object.keys(popupModes).forEach(popupMode => {
    const name = `${popupModes[popupMode]}`

    describe(`${name}`, () => {
      it(`${name} Desktop`, () => {
        open('/popup.html?foobar=hello')
        openPopup(`#btn-${popupMode}`)
        waitForEmbed()
        eyesCheckDesktop('Popup')
      })

      it(`${name} Mobile`, () => {
        openOnMobile('/popup.html?foobar=hello')
        openPopup(`#btn-${popupMode}`)
        waitForEmbed()
        eyesCheckMobile('Popup')
      })
    })
  })
})
