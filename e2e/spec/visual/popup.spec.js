import { open, openOnMobile, openPopup, waitForEmbed } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Popup Widget', () => {
  const popupModes = {
    popup: 'Popup',
    drawer_left: 'Drawer Left',
    drawer_right: 'Drawer Right',
    popover: 'Popover'
  }

  Object.keys(popupModes).forEach(popupMode => {
    const name = `${popupModes[popupMode]}`

    describe(`${name}`, () => {
      it(`${name} Desktop`, () => {
        open('/popup?foobar=hello')
        openPopup(popupMode)
        waitForEmbed(1000)
        eyesCheckDesktop('Popup')
      })

      it(`${name} Mobile`, () => {
        openOnMobile('/popup?foobar=hello')
        openPopup(popupMode)
        waitForEmbed(1000)
        eyesCheckMobile('Popup')
      })
    })
  })
})
