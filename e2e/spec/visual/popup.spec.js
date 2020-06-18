import { open, openOnMobile, openPopup, waitForEmbed } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Popup Widget', () => {
  const popupModes = {
    1: 'Popup',
    2: 'Drawer Left',
    3: 'Drawer Right'
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
