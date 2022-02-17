import { buildOptionsFromAttributes } from './build-options-from-attributes'

describe('build-options-from-attributes', () => {
  describe('#buildOptionsFromAttributes', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div id="element"
        data-tf-source="unit-test-source"
        data-tf-medium="unit-test-medium"
        data-tf-medium-version="unit-test-version"
        data-tf-hide-footer="yes"
        data-tf-hide-headers="no"
        data-tf-opacity="50"
        data-tf-disable-tracking
        data-tf-disable-auto-focus
        data-tf-on-ready="onTypeformReady"
        data-tf-on-submit="onTypeformSubmit"
        data-tf-on-question-changed="onTypeformQuestionChanged"
        data-tf-on-height-changed="onTypeformHeightChanged"
        data-tf-auto-resize="100,300"
        data-tf-open="exit"
        data-tf-open-value="3000"
        data-tf-hidden="foo=foo value,bar=some bar value"
        data-tf-chat
        data-tf-share-ga-instance="ua-hello-1"
        data-tf-tracking="utm_foo=utm foo value,foobar=foobar value"
        data-tf-redirect-target="_blank"
        data-tf-lazy
        data-tf-keep-session
      ></div>`

    it('should load correct options', () => {
      const win = window as any
      win.onTypeformReady = jest.fn()
      win.onTypeformSubmit = jest.fn()
      win.onTypeformQuestionChanged = jest.fn()
      win.onTypeformHeightChanged = jest.fn()

      const element = wrapper.querySelector('#element') as HTMLElement
      const options = buildOptionsFromAttributes(element)

      expect(options).toMatchObject({
        source: 'unit-test-source',
        medium: 'unit-test-medium',
        mediumVersion: 'unit-test-version',
        hideFooter: true,
        hideHeaders: false,
        opacity: 50,
        disableTracking: true,
        onReady: win.onTypeformReady,
        onSubmit: win.onTypeformSubmit,
        onQuestionChanged: win.onTypeformQuestionChanged,
        onHeightChanged: win.onTypeformHeightChanged,
        autoResize: '100,300',
        open: 'exit',
        openValue: 3000,
        hidden: {
          foo: 'foo value',
          bar: 'some bar value',
        },
        chat: true,
        shareGaInstance: 'ua-hello-1',
        tracking: {
          utm_foo: 'utm foo value',
          foobar: 'foobar value',
        },
        redirectTarget: '_blank',
        lazy: true,
        keepSession: true,
      })
    })
  })
})
