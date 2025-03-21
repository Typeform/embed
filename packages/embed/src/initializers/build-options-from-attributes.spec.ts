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
        data-tf-on-started="onTypeformStarted"
        data-tf-on-submit="onTypeformSubmit"
        data-tf-on-question-changed="onTypeformQuestionChanged"
        data-tf-on-height-changed="onTypeformHeightChanged"
        data-tf-on-duplicate-detected="onDuplicateDetected"
        data-tf-auto-resize="100,300"
        data-tf-open="exit"
        data-tf-open-value="3000"
        data-tf-hidden="foo=foo value,bar=some bar value"
        data-tf-share-ga-instance="ua-hello-1"
        data-tf-tracking="utm_foo=utm foo value,foobar=foobar value"
        data-tf-redirect-target="_blank"
        data-tf-domain="custom.example.com"
        data-tf-lazy
        data-tf-keep-session
        data-tf-disable-scroll
        data-tf-full-screen
        data-tf-no-heading
        data-tf-iframe-props="title=foo"
        data-tf-button-props="aria-label=bar"
        data-tf-preselect="foo=bar"
        data-tf-respect-open-modals="all"
        data-tf-no-scrollbars
      ></div>`

    it('should load correct options', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any
      win.onTypeformReady = jest.fn()
      win.onTypeformStarted = jest.fn()
      win.onTypeformSubmit = jest.fn()
      win.onTypeformQuestionChanged = jest.fn()
      win.onTypeformHeightChanged = jest.fn()
      win.onDuplicateDetected = jest.fn()

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
        onStarted: win.onTypeformStarted,
        onSubmit: win.onTypeformSubmit,
        onQuestionChanged: win.onTypeformQuestionChanged,
        onHeightChanged: win.onTypeformHeightChanged,
        onDuplicateDetected: win.onDuplicateDetected,
        autoResize: '100,300',
        open: 'exit',
        openValue: 3000,
        hidden: {
          foo: 'foo value',
          bar: 'some bar value',
        },
        shareGaInstance: 'ua-hello-1',
        tracking: {
          utm_foo: 'utm foo value',
          foobar: 'foobar value',
        },
        redirectTarget: '_blank',
        domain: 'custom.example.com',
        lazy: true,
        keepSession: true,
        disableScroll: true,
        fullScreen: true,
        noHeading: true,
        iframeProps: {
          title: 'foo',
        },
        buttonProps: {
          'aria-label': 'bar',
        },
        preselect: {
          foo: 'bar',
        },
        respectOpenModals: 'all',
        noScrollbars: true,
      })
    })
  })
})
