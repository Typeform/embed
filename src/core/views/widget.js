import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import {
  debounce,
  broadcastMessage,
  isElementInViewport,
  callIfEmbedIdMatches,
  updateQueryStringParameter,
  redirectToUrl,
  getSubmitEventData,
  removeColorTransparency
} from '../utils'
import randomString from '../utils/random-string'

import Iframe from './components/iframe'
import MobileModal from './mobile-modal'

const DEBOUNCE_WAIT = 200

const WidgetWrapper = styled.div`
  height: 100%;
  position: relative;
`

const PlaceholderAnimationAppear = keyframes`
  10% {
    opacity: 1;
  }

  25% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  70% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  100% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`

const PlaceholderAnimationDisappear = keyframes`
  100% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }


  25% {
    opacity: 1;
  }

  0% {
    opacity: 0;
  }
`

const Placeholder = styled.div`
  position: fixed;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: ${props => (props.height ? `${props.height}px` : '100%')};
  width: ${props => (props.width ? `${props.width}px` : '100%')};

  animation: ${props =>
    props.open ? PlaceholderAnimationAppear : PlaceholderAnimationDisappear}
  1.5s ease;

  visibility: ${props => (props.visible ? 'visible' : 'hidden')};

  background: ${props => props.backgroundColor};
  opacity: 0;
  pointer-events: none;
`

const IframeWrapper = styled.div`
  height: 100%;
  width: 100%;

  overflow: hidden;
  background: ${props => props.backgroundColor};
`

class Widget extends Component {
  constructor (props) {
    super(props)

    this.embedId = props.embedId || randomString()
    this.mobileEmbedId = randomString()
    this.wrapperRef = createRef()
    this.fullScreenModalDiv = document.createElement('div')

    this.state = {
      isFormReady: false,
      isIframeFocused: false,
      isFullscreen: false,
      buttonColor: 'black',
      backgroundColor: 'transparent'
    }

    this.handleMessage = this.handleMessage.bind(this)
    this.handleFormReady = callIfEmbedIdMatches(this.handleFormReady.bind(this), this.embedId)
    this.handleFormSubmit = callIfEmbedIdMatches(this.handleFormSubmit.bind(this), this.embedId)
    this.handleMobileFormSubmit = this.handleMobileFormSubmit.bind(this)
    this.handleFormTheme = callIfEmbedIdMatches(this.handleFormTheme.bind(this), this.embedId)
    this.goFullScreen = callIfEmbedIdMatches(this.goFullScreen.bind(this), this.embedId)
    this.focusIframe = this.focusIframe.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.reloadIframe = this.reloadIframe.bind(this)
    this.debouncedScroll = debounce(this.focusIframe, DEBOUNCE_WAIT, this)
    this.setIframeRef = this.setIframeRef.bind(this)
    this.sendFocusMessageToIframe = this.sendFocusMessageToIframe.bind(this)
  }

  componentDidMount () {
    window.addEventListener('message', this.handleMessage)
    window.addEventListener('form-ready', this.handleFormReady)
    window.addEventListener('scroll', this.debouncedScroll)
    window.addEventListener('form-submit', this.handleFormSubmit)
    window.addEventListener('form-theme', this.handleFormTheme)
    window.addEventListener('welcome-screen-hidden', this.goFullScreen)
    window.addEventListener('redirect-after-submit', redirectToUrl)
    window.addEventListener('thank-you-screen-redirect', redirectToUrl)

    document.body.appendChild(this.fullScreenModalDiv)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleMessage)
    window.removeEventListener('form-ready', this.handleFormReady)
    window.removeEventListener('scroll', this.debouncedScroll)
    window.removeEventListener('form-submit', this.handleFormSubmit)
    window.removeEventListener('form-theme', this.handleFormTheme)
    window.removeEventListener('welcome-screen-hidden', this.goFullScreen)
    window.removeEventListener('redirect-after-submit', redirectToUrl)
    window.removeEventListener('thank-you-screen-redirect', redirectToUrl)

    document.body.removeChild(this.fullScreenModalDiv)
  }

  setIframeRef (node) {
    this.iframe = node
  }

  goFullScreen () {
    if (this.props.enabledFullscreen) {
      this.setState({ isFullscreen: true })
      setTimeout(this.reloadIframe, 500)
    }
  }

  handleClose () {
    this.setState({ isFullscreen: false })
  }

  handleFormReady () {
    this.setState(
      {
        isFormReady: true
      },
      () => {
        this.focusIframe()
      }
    )
  }

  handleFormTheme (event) {
    const { theme } = event.detail || {}
    this.setState({
      backgroundColor: theme.backgroundColor,
      buttonColor: theme.color
    })
  }

  handleMessage (event) {
    broadcastMessage(this.embedId, event)
  }

  handleFormSubmit (event) {
    if (this.props.options.onSubmit) {
      this.props.options.onSubmit(getSubmitEventData(event))
    }
  }

  handleMobileFormSubmit (event) {
    this.props.options.onSubmit(event)
  }

  reloadIframe () {
    // Re-assign the source of the iframe, makes it reload cross-browser
    // eslint-disable-next-line
    this.iframe.iframeRef.src = this.iframe.iframeRef.src
  }

  focusIframe () {
    if (this.props.enabledFullscreen) return

    const { iframeRef } = this.iframe
    if (!iframeRef || !iframeRef.contentWindow) {
      return
    }
    const isIframeInViewport = isElementInViewport(iframeRef)
    const canPostMessage =
      this.state.isFormReady &&
      !this.state.isIframeFocused &&
      isIframeInViewport &&
      iframeRef.contentWindow != null

    if (canPostMessage) {
      this.setState({ isIframeFocused: true }, this.sendFocusMessageToIframe)
    }
  }

  sendFocusMessageToIframe () {
    const { iframeRef } = this.iframe
    if (!iframeRef) { return }

    setTimeout(
      () => iframeRef.contentWindow.postMessage('embed-focus', '*'),
      100
    )
  }

  render () {
    const {
      isFullscreen,
      backgroundColor,
      buttonColor,
      isFormReady
    } = this.state

    const { enabledFullscreen, url } = this.props

    const iframePosition =
      this.iframe && this.iframe.iframeRef.getBoundingClientRect()

    let inlineIframeUrl = updateQueryStringParameter('typeform-embed-id', this.embedId, url)

    if (enabledFullscreen) {
      inlineIframeUrl = updateQueryStringParameter('disable-tracking', 'true', inlineIframeUrl)
    }

    let fullscreenIframeUrl = updateQueryStringParameter('typeform-welcome', '0', url)

    // fullscreen modal window should not have transparency because it has to cover the host page under it
    fullscreenIframeUrl = updateQueryStringParameter('embed-opacity', '100', fullscreenIframeUrl)

    // placeholder background should match background of the welcome screen when modal is closed (it might be transparent)
    // when the fullscreen modal is opened it should match background of the modal (modal background is never transparent)
    const placeholderBackgroundColor = isFullscreen ? removeColorTransparency(backgroundColor) : backgroundColor

    return (
      <WidgetWrapper ref={this.wrapperRef}>
        <IframeWrapper
          backgroundColor={enabledFullscreen ? backgroundColor : 'transparent'}
        >
          <Iframe
            frameBorder='0'
            height='100%'
            ref={this.setIframeRef}
            src={inlineIframeUrl}
            width='100%'
          />
        </IframeWrapper>
        { enabledFullscreen &&
            <Placeholder
              backgroundColor={placeholderBackgroundColor}
              bottom={iframePosition && iframePosition.bottom}
              height={iframePosition && iframePosition.height}
              left={iframePosition && iframePosition.left}
              open={isFullscreen}
              right={iframePosition && iframePosition.right}
              top={iframePosition && iframePosition.top}
              visible={isFormReady}
              width={iframePosition && iframePosition.width}
            />
        }
        { enabledFullscreen && ReactDOM.createPortal(
          <MobileModal
            backgroundColor={backgroundColor}
            buttonColor={buttonColor}
            embedId={this.mobileEmbedId}
            onClose={this.handleClose}
            onSubmit={this.handleMobileFormSubmit}
            open={isFullscreen}
            openDelay={0.3}
            url={fullscreenIframeUrl}
          />,
          this.fullScreenModalDiv
        )}
      </WidgetWrapper>
    )
  }
}

Widget.propTypes = {
  url: PropTypes.string,
  options: PropTypes.object.isRequired,
  enabledFullscreen: PropTypes.bool,
  embedId: PropTypes.string
}

Widget.defaultProps = {
  options: {},
  enabledFullscreen: false
}

export default Widget
