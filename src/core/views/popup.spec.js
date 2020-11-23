import React from 'react'
import CustomEvent from 'custom-event'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import * as utils from '../utils'

import Popup, {
  POPUP,
  DRAWER,
  DRAWER_RIGHT,
  POPOVER,
  SIDE_PANEL
} from './popup'
import Iframe from './components/iframe'

jest.mock('./components/spinner', () => () => null)

const URL = 'http://popup.cat'
const EMBED_ID = '123456'

const popupOptions = {
  mode: POPUP
}

Enzyme.configure({ adapter: new Adapter() })

describe('Popup', () => {
  it('renders an iframe with the passed url prop', () => {
    const expectedUrl = `${URL}?typeform-embed-id=${EMBED_ID}`
    const popup = shallow(<Popup embedId={EMBED_ID} options={popupOptions} url={URL} />)

    expect(popup.find(Iframe).prop('src')).toEqual(expectedUrl)
  })

  it('calls onClose callback function when close button is clicked', done => {
    const onCloseMock = jest.fn()
    const popup = shallow(
      <Popup onClose={onCloseMock} options={popupOptions} url={URL} />
    )

    jest.useFakeTimers()

    popup.setState({ iframeLoaded: true }, () => {
      popup.find('[data-qa="popup-close-button"]').simulate('click')
      popup.setState({}, () => {
        expect(setTimeout.mock.calls.length).toBe(1)
        expect(setTimeout.mock.calls[0][1]).toBe(400)

        jest.runOnlyPendingTimers()

        popup.setState({}, () => {
          jest.runOnlyPendingTimers()

          expect(setTimeout.mock.calls.length).toBe(2)
          expect(setTimeout.mock.calls[1][1]).toBe(400)
          expect(onCloseMock).toHaveBeenCalledTimes(1)
          done()
        })
      })
    })
  })

  describe('renders the correct mode', () => {
    const useCases = [
      POPUP,
      DRAWER,
      DRAWER_RIGHT,
      POPOVER,
      SIDE_PANEL
    ]

    useCases.forEach((mode) => {
      it(`for "${mode}" mode`, () => {
        const options = { mode }
        const popup = shallow(<Popup options={options} url={URL}/>)
        expect(popup.find(`[data-qa="popup-mode-${mode}"]`)).toHaveLength(1)
      })
    })
  })

  describe('onSubmit callback', () => {
    it('is executed upon typeform submission when embed ID matches', () => {
      const onSubmitMock = jest.fn()
      const options = { ...popupOptions, onSubmit: onSubmitMock }
      mount(<Popup embedId={EMBED_ID} options={options} url={URL}/>)

      window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } }))
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })

    it('is not executed upon typeform submission when embed ID does not match', () => {
      const onSubmitMock = jest.fn()
      const options = { ...popupOptions, onSubmit: onSubmitMock }
      mount(<Popup embedId={EMBED_ID} options={options} url={URL}/>)

      window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: '098765' } }))
      expect(onSubmitMock).not.toHaveBeenCalled()
    })

    it('receives event data', () => {
      const onSubmitMock = jest.fn()
      const options = { ...popupOptions, onSubmit: onSubmitMock }
      const getSubmitEventDataSpy = jest.spyOn(utils, 'getSubmitEventData')
      const event = new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } })

      shallow(<Popup embedId={EMBED_ID} options={options} url={URL}/>)

      window.dispatchEvent(event)
      expect(getSubmitEventDataSpy).toHaveBeenCalledWith(event)
    })
  })

  describe('onScreenChanged callback', () => {
    it('should be called when the user execute an interaction that triggers a screen change', () => {
      const onScreenChangedMock = jest.fn()
      const options = { ...popupOptions, onScreenChanged: onScreenChangedMock }
      mount(<Popup embedId={EMBED_ID} options={options} url={URL}/>)

      window.dispatchEvent(new CustomEvent('form-screen-changed', { detail: { embedId: EMBED_ID } }))
      expect(onScreenChangedMock).toHaveBeenCalledTimes(1)
    })

    it('should NOT be called when the user execute an interaction that triggers a screen change and the embed ID doesn\'t match', () => {
      const onScreenChangedMock = jest.fn()
      const options = { ...popupOptions, onScreenChanged: onScreenChangedMock }
      mount(<Popup embedId={EMBED_ID} options={options} url={URL}/>)

      window.dispatchEvent(new CustomEvent('form-screen-changed', { detail: { embedId: '098765' } }))
      expect(onScreenChangedMock).not.toHaveBeenCalled()
    })
  })

  describe(`upon receiving upon 'embed-auto-close-popup' event`, () => {
    let onCloseMock
    it('does not call onAutoClose callback function when auto close is not enabled', () => {
      onCloseMock = jest.fn()
      const options = { ...popupOptions, isAutoCloseEnabled: false }
      const popup = mount(
        <Popup onClose={onCloseMock} options={options} url={URL} />
      )

      jest.useFakeTimers()

      window.dispatchEvent(
        new CustomEvent('embed-auto-close-popup', { detail: {} })
      )
      jest.runAllTimers()
      expect(onCloseMock).not.toHaveBeenCalled()
      popup.unmount()
    })

    describe('when auto close is enabled', () => {
      let popup

      beforeEach(() => {
        onCloseMock = jest.fn()
        jest.clearAllTimers()
      })

      afterEach(() => {
        popup.unmount()
      })

      it(`calls onAutoClose callback function `, () => {
        const options = { ...popupOptions, isAutoCloseEnabled: true }
        popup = mount(
          <Popup onClose={onCloseMock} options={options} url={URL} />
        )

        jest.useFakeTimers()

        window.dispatchEvent(
          new CustomEvent('embed-auto-close-popup', { detail: {} })
        )
        jest.runAllTimers()
        expect(onCloseMock).toHaveBeenCalled()
      })

      it(`calls onAutoClose callback function after specified timeout`, () => {
        const autoCloseTimeout = 8
        const options = {
          ...popupOptions,
          isAutoCloseEnabled: true,
          autoClose: autoCloseTimeout
        }
        popup = mount(
          <Popup onClose={onCloseMock} options={options} url={URL} />
        )

        jest.useFakeTimers()

        window.dispatchEvent(
          new CustomEvent('embed-auto-close-popup', {
            detail: { canSetAutocloseDelay: true }
          })
        )
        jest.runAllTimers()

        expect(setTimeout.mock.calls[0][1]).toBe(autoCloseTimeout * 1000)
      })
    })
  })
})
