/* eslint-disable no-unused-vars */
import React from 'react'
import CustomEvent from 'custom-event'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import randomString from '../utils/random-string'
import * as utils from '../utils'

import Widget from './widget'
import MobileModal from './mobile-modal'
import Iframe from './components/iframe'

jest.mock('../utils/random-string')

const URL = 'http://widget.cat'
const UID = 'a unique id'
const EMBED_ID = '123456'

randomString.mockImplementation(() => EMBED_ID)

Enzyme.configure({ adapter: new Adapter() })

describe('Widget', () => {
  it('renders an iframe with the passed url prop', () => {
    const widget = shallow(<Widget embedId={EMBED_ID} url={URL} />)

    expect(widget.find(Iframe).prop('src')).toEqual(`${URL}?typeform-embed-id=${EMBED_ID}`)
  })

  it('onSubmit callback is executed upon typeform submission when embed ID matches', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    mount(<Widget embedId={EMBED_ID} options={options} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } }))
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('onSubmit callback is not executed upon typeform submission when embed ID does not match', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    mount(<Widget embedId={EMBED_ID} options={options} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: '098765' } }))
    expect(onSubmitMock).not.toHaveBeenCalled()
  })

  it('passes event data to onSubmit callback', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    const getSubmitEventDataSpy = jest.spyOn(utils, 'getSubmitEventData')
    const event = new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } })

    shallow(<Widget embedId={EMBED_ID} options={options} url={URL} />)

    window.dispatchEvent(event)
    expect(getSubmitEventDataSpy).toHaveBeenCalledWith(event)
  })

  describe('on fullscreen mode', () => {
    it('onSubmit callback is executed upon typeform submission', () => {
      const MOBILE_EMBED_ID = '098765'
      randomString
        .mockImplementationOnce(() => EMBED_ID)
        .mockImplementationOnce(() => MOBILE_EMBED_ID)
      const onSubmitMock = jest.fn()
      const options = { onSubmit: onSubmitMock }
      mount(<Widget embedId={MOBILE_EMBED_ID} enabledFullscreen options={options} url={URL}/>)

      window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: MOBILE_EMBED_ID } }))
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })

    it('renders an iframe with disabled submissions', () => {
      const wrapper = mount(<Widget embedId={EMBED_ID} enabledFullscreen url={URL}/>)
      expect(wrapper.find(Iframe)).toHaveLength(1)
      expect(wrapper.find(Iframe).props().src.includes('disable-tracking=true')).toBe(true)
    })

    it('renders a second iframe after the welcome-screen-hidden event', () => {
      const wrapper = mount(<Widget embedId={EMBED_ID} enabledFullscreen url={URL}/>)

      let modal = wrapper.find(MobileModal)
      expect(wrapper.find(MobileModal).props().url.includes('typeform-welcome=0')).toBe(true)
      expect(wrapper.find(MobileModal).props().open).toBe(false)

      window.dispatchEvent(new CustomEvent('welcome-screen-hidden', { detail: { embedId: EMBED_ID } }))

      wrapper.update()

      modal = wrapper.find(MobileModal)
      expect(wrapper.find(MobileModal).props().url.includes('typeform-welcome=0')).toBe(true)
      expect(wrapper.find(MobileModal).props().open).toBe(true)
    })
  })
})
