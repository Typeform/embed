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
const EMBED_ID = '123456'

randomString.mockImplementation(() => EMBED_ID)

Enzyme.configure({ adapter: new Adapter() })

describe('Widget', () => {
  it('renders an iframe with the passed url prop', () => {
    const widget = shallow(<Widget url={URL} />)

    expect(widget.find(Iframe).prop('src')).toEqual(`${URL}?typeform-embed-id=${EMBED_ID}`)
  })

  it('onSubmit callback is executed upon typeform submission when embed ID matches', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    mount(<Widget options={options} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } }))
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('onSubmit callback is not executed upon typeform submission when embed ID does not match', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    mount(<Widget options={options} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: '098765' } }))
    expect(onSubmitMock).not.toHaveBeenCalled()
  })

  it('onScreenChanged callback is executed when the user execute an interaction that triggers a screen change', () => {
    const onScreenChangedMock = jest.fn()
    const options = { onScreenChanged: onScreenChangedMock }
    mount(<Widget options={options} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-screen-changed'))
    expect(onScreenChangedMock).toHaveBeenCalledTimes(1)
  })

  it('passes event data to onSubmit callback', () => {
    const onSubmitMock = jest.fn()
    const options = { onSubmit: onSubmitMock }
    const getSubmitEventDataSpy = jest.spyOn(utils, 'getSubmitEventData')
    const event = new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } })

    shallow(<Widget options={options} url={URL} />)

    window.dispatchEvent(event)
    expect(getSubmitEventDataSpy).toHaveBeenCalledWith(event)
  })

  describe('on fullscreen mode', () => {
    it('onSubmit callback is executed upon typeform submission', () => {
      const MOBILE_EMBED_ID = '098765'
      randomString.mockImplementationOnce(() => EMBED_ID).mockImplementationOnce(() => MOBILE_EMBED_ID)
      const onSubmitMock = jest.fn()
      const options = { onSubmit: onSubmitMock }
      mount(<Widget enabledFullscreen options={options} url={URL} />)

      window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: MOBILE_EMBED_ID } }))
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })

    it('renders an iframe with disabled submissions and placeholder welcome screen', () => {
      const wrapper = mount(<Widget enabledFullscreen url={URL} />)
      expect(wrapper.find(Iframe)).toHaveLength(1)
      expect(wrapper.find(Iframe).props().src.includes('disable-tracking=true')).toBe(true)
      expect(wrapper.find(Iframe).props().src.includes('add-placeholder-ws=true')).toBe(true)
    })

    it('renders an iframe without disabled submissions and placeholder welcome screen when URL contains "typeform-welcome=0"', () => {
      const wrapper = mount(<Widget enabledFullscreen url={`${URL}?typeform-welcome=0`} />)
      expect(wrapper.find(Iframe)).toHaveLength(1)
      expect(wrapper.find(Iframe).props().src.includes('disable-tracking=true')).toBe(false)
      expect(wrapper.find(Iframe).props().src.includes('add-placeholder-ws=true')).toBe(false)
      expect(wrapper.find(Iframe).props().src.includes('__dangerous-disable-submissions=true')).toBe(false)
    })

    it('renders a second iframe after the welcome-screen-hidden event', () => {
      const wrapper = mount(<Widget enabledFullscreen url={URL} />)

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
