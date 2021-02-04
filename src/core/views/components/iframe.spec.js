import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Iframe from './iframe'

Enzyme.configure({ adapter: new Adapter() })

describe('Iframe test suite', () => {
  it('Trigger iframe redraw right after load', async () => {
    const triggerIframeRedrawReal = Iframe.prototype.triggerIframeRedraw
    const triggerIframeRedrawMock = jest.fn(() => Promise.resolve())

    Iframe.prototype.triggerIframeRedraw = triggerIframeRedrawMock
    const popup = shallow(<Iframe src="example.com" />)
    await popup.instance().handleLoad()

    Iframe.prototype.triggerIframeRedraw = triggerIframeRedrawReal
    expect(triggerIframeRedrawMock).toHaveBeenCalledTimes(1)
  })
})
