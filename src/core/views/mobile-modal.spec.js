/* eslint-disable no-unused-vars */
import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CustomEvent from 'custom-event'

import * as utils from '../utils'

import MobileModal from './mobile-modal'
import Iframe from './components/iframe'
import CloseIcon from './components/close-icon'

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const URL = 'http://mobilemodal.cat'
const EMBED_ID = '123456'

Enzyme.configure({ adapter: new Adapter() })

describe('MobileModal', () => {
  it('do not render an iframe', () => {
    const wrapper = shallow(<MobileModal url={URL} />)

    expect(wrapper.find(Iframe)).toBeTruthy()
  })

  it('renders an iframe', () => {
    const expectedUrl = `${URL}?typeform-embed-id=${EMBED_ID}`
    const wrapper = shallow(<MobileModal embedId={EMBED_ID} open url={URL} />)

    expect(wrapper.find(Iframe).prop('src')).toEqual(expectedUrl)
  })

  it('displays the modal when open prop is received', () => {
    const wrapper = shallow(<MobileModal open url={URL} />)

    expect(wrapper.prop('open')).toBeTruthy()
  })

  it('hides the modal when open prop is not received', () => {
    const wrapper = shallow(<MobileModal url={URL} />)

    expect(wrapper.prop('open')).toBeFalsy()
  })

  it('calls onClose callback when close button is clicked', () => {
    const onCloseSpy = jest.fn()
    const wrapper = shallow(<MobileModal onClose={onCloseSpy} url={URL} />)
    const closeButton = wrapper.find(CloseIcon)

    closeButton.simulate('click')

    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  })

  it('onSubmit callback is executed upon typeform submission when embed ID matches', () => {
    const onSubmitSpy = jest.fn()
    mount(<MobileModal embedId={EMBED_ID} onSubmit={onSubmitSpy} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } }))
    expect(onSubmitSpy).toHaveBeenCalledTimes(1)
  })

  it('onSubmit callback is not executed upon typeform submission when embed ID does not match', () => {
    const onSubmitSpy = jest.fn()
    mount(<MobileModal embedId={EMBED_ID} onSubmit={onSubmitSpy} url={URL} />)

    window.dispatchEvent(new CustomEvent('form-submit', { detail: { embedId: '098765' } }))
    expect(onSubmitSpy).not.toHaveBeenCalled()
  })

  it('passes event data to onSubmit callback', () => {
    const onSubmitSpy = jest.fn()
    const getSubmitEventDataSpy = jest.spyOn(utils, 'getSubmitEventData')
    const event = new CustomEvent('form-submit', { detail: { embedId: EMBED_ID } })

    shallow(<MobileModal embedId={EMBED_ID} onSubmit={onSubmitSpy} url={URL} />)
    window.dispatchEvent(event)

    expect(getSubmitEventDataSpy).toHaveBeenCalledWith(event)
  })

  describe('prevent page below modal to scroll', () => {
    beforeEach(() => {
      document.body.classList.remove('__typeform-embed-mobile-modal-open')
    })

    it('adds class on mount and removes on unmount', () => {
      jest.useFakeTimers()
      const wrapper = mount(<MobileModal open url={URL} />)

      const bodyClassName = '__typeform-embed-mobile-modal-open'

      jest.runAllTimers()
      expect(document.body.classList.contains(bodyClassName)).toBeTruthy()
      wrapper.unmount()
      expect(document.body.classList.contains(bodyClassName)).toBeFalsy()
    })

    it('removes class when close button is clicked', () => {
      jest.useFakeTimers()
      const wrapper = mount(<MobileModal open url={URL} />)

      const bodyClassName = '__typeform-embed-mobile-modal-open'

      jest.runAllTimers()
      expect(document.body.classList.contains(bodyClassName)).toBeTruthy()

      const closeButton = wrapper.find('[data-qa="close-button-mobile"]').first()
      closeButton.simulate('click')

      expect(document.body.classList.contains(bodyClassName)).toBeFalsy()
    })

    it('adds class when modal opens', () => {
      jest.useFakeTimers()
      const wrapper = mount(<MobileModal url={URL} />)

      const bodyClassName = '__typeform-embed-mobile-modal-open'

      expect(document.body.classList.contains(bodyClassName)).toBeFalsy()

      wrapper.setProps({ open: true })
      jest.runAllTimers()

      expect(document.body.classList.contains(bodyClassName)).toBeTruthy()
    })
  })
})
