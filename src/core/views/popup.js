import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import ScrollbarWidth from 'scrollbar-width'
import styled from 'styled-components'

import closeImg from '../../../assets/close.gif'
import {
  broadcastMessage,
  callIfEmbedIdMatches,
  redirectToUrl,
  updateQueryStringParameter,
  getSubmitEventData
} from '../utils'

import Iframe from './components/iframe'
import Spinner from './components/spinner'

const ESC_KEY_CODE = 27
const CLOSE_BUTTON_WIDTH = 30

export const DEFAULT_AUTOCLOSE_TIMEOUT = 5
export const POPUP = 'popup'
export const DRAWER = 'drawer_left'
export const DRAWER_RIGHT = 'drawer_right'
export const POPOVER = 'popover'
export const SIDE_PANEL = 'side_panel'
export const POPUP_MODES = {
  [POPUP]: 'popup-blank',
  [DRAWER]: 'popup-classic',
  [DRAWER_RIGHT]: 'popup-drawer',
  [POPOVER]: 'popup-popover',
  [SIDE_PANEL]: 'popup-side-panel'
}

const BaseWrapper = styled.div`
  visibility: ${p => (p.open ? 'visible' : 'hidden')};
  opacity: ${p => (p.open ? 1 : 0)};
  position: ${p => (p.isContained ? 'absolute' : 'fixed')};
  max-width: 100%;
  z-index: 10001;
`

const Overlay = styled.div`
  visibility: ${p => (p.appearing ? 'hidden' : 'visible')};
  opacity: ${p => (p.appearing ? 0 : 1)};
  transition: opacity 200ms ease,
    visibility 0s linear ${p => (p.appearing ? '200ms' : '0s')};
  background: rgba(0, 0, 0, 0.85);
  position: ${p => (p.isContained ? 'absolute' : 'fixed')};
  overflow: ${p => (p.isContained ? 'hidden' : 'auto')};
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
  min-height: 100%;
`

const popupWrapper = styled(BaseWrapper)`
  ${p => {
    const offset = (100 - p.size) / 2
    if (p.isContained) {
      return `
        width: calc(${p.size}% - 80px); 
        height: calc(${p.size}% - 80px); 
        top: calc(${offset}% + 40px);
        left: calc(${offset}% + 40px);
      `
    }
    return `
      width: calc(${p.size}% - 80px); 
      height: calc(${p.size}% - 80px); 
      top: calc(${offset}% + 40px);
      left: calc(${offset}% + 40px);
    `
  }}
  transition: all 300ms ease-out;
`

const drawerWrapper = styled(BaseWrapper)`
  transition: all 400ms ease-out;
  width: ${p => p.width}px;
  height: 100%;
  top: 0;
`

const drawerLeftWrapper = styled(drawerWrapper)`
  left: ${p => (!p.open ? -(p.width - CLOSE_BUTTON_WIDTH) : 0)}px;
`

const drawerRightWrapper = styled(drawerWrapper)`
  right: ${p => (!p.open ? -(p.width - CLOSE_BUTTON_WIDTH) : 0)}px;
`

const popoverWrapper = styled(BaseWrapper)`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  transition: all 300ms ease-out;
  bottom: 96px;
  right: 16px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.06) 0px 2px 12px;
`

const sidePanelWrapper = styled.div`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  box-shadow: rgba(0, 0, 0, ${p => p.open ? '0.08' : '0'}) 0px 2px 4px, rgba(0, 0, 0, ${p => p.open ? '0.06' : '0'}) 0px 2px 12px;
  transition: box-shadow 300ms ease-out;
  `

const BaseCloseImage = styled.img`
  position: absolute;
  padding: 8px;
  cursor: pointer;
  width: initial;
  max-width: initial;
`

const IconCloseImage = styled.img`
  padding: 8px;
  vertical-align: middle;
`

const closeImagePopup = styled(BaseCloseImage)`
  top: -34px;
  right: -34px;
`

const closeImageLeft = styled(BaseCloseImage)`
  top: 12px;
  right: -38px;
  @media screen and (max-width: 800px) {
    right: 12px;
  }
`

const closeImageRight = styled(BaseCloseImage)`
  top: 12px;
  left: -38px;
  right: auto;
  @media screen and (max-width: 800px) {
    left: 12px;
  }
`

class Popup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      frameAnimate: false,
      iframeLoaded: false,
      popupAnimate: true,
      transitionEnded: false
    }

    this.handleMessage = this.handleMessage.bind(this)
    this.handleKeyDown = callIfEmbedIdMatches(this.handleKeyDown.bind(this), this.props.embedId)
    this.handleAutoClose = callIfEmbedIdMatches(this.handleAutoClose.bind(this), this.props.embedId)
    this.handleClose = callIfEmbedIdMatches(this.handleClose.bind(this), this.props.embedId)
    this.handleFormSubmit = callIfEmbedIdMatches(this.handleFormSubmit.bind(this), this.props.embedId)
    this.handleIframeLoad = this.handleIframeLoad.bind(this)
    this.handleAnimateBeforeClose = this.handleAnimateBeforeClose.bind(this)
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
  }

  componentDidMount () {
    window.addEventListener('message', this.handleMessage)
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('form-close', this.handleClose)
    window.addEventListener('form-submit', this.handleFormSubmit)
    window.addEventListener('embed-auto-close-popup', this.handleAutoClose)
    window.addEventListener('redirect-after-submit', redirectToUrl)
    window.addEventListener('thank-you-screen-redirect', redirectToUrl)
    window.tfClosePopup = this.handleClose

    setTimeout(() => {
      this.setState({
        popupAnimate: false
      })
    }, 100)

    const spinnerConfig = { scale: 0.6 }
    this.updateIcon(<Spinner config={spinnerConfig} stopped={this.state.iframeLoaded} />)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleMessage)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('form-close', this.handleClose)
    window.removeEventListener('form-submit', this.handleFormSubmit)
    window.removeEventListener('embed-auto-close-popup', this.handleAutoClose)
    window.removeEventListener('redirect-after-submit', redirectToUrl)
    window.removeEventListener('thank-you-screen-redirect', redirectToUrl)
    delete window.tfClosePopup
  }

  setWrapperRef (node) {
    this.wrapper = node
  }

  getWrapperComponent (mode) {
    if (mode === DRAWER_RIGHT) return drawerRightWrapper
    if (mode === DRAWER) return drawerLeftWrapper
    if (mode === POPOVER) return popoverWrapper
    if (mode === SIDE_PANEL) return sidePanelWrapper
    return popupWrapper
  }

  getCloseImage (mode) {
    if (mode === DRAWER_RIGHT) return closeImageRight
    if (mode === DRAWER) return closeImageLeft
    return closeImagePopup
  }

  updateIcon (component) {
    if (this.props.icon) {
      if (!this.iconHTML) {
        this.iconHTML = this.props.icon.innerHTML
      }

      this.props.icon.innerHTML = ''

      if (component) {
        render(component, this.props.icon)
      } else {
        this.props.icon.innerHTML = this.iconHTML
      }
    }
  }

  handleIframeLoad (iframeRef) {
    this.setState({ iframeLoaded: true }, () => {
      setTimeout(() => {
        if (this.state.isLoading) {
          this.updateIcon(
            <IconCloseImage
              alt='close-typeform'
              data-qa='popup-close-button'
              src={closeImg}
            />
          )
          this.handleSidePanelOpen()
          this.setState({ frameAnimate: true, isLoading: false })
          if (iframeRef && iframeRef.contentWindow) {
            iframeRef.contentWindow.focus()
          }
        }
      }, 500)
    })
  }

  handleAnimateBeforeClose () {
    this.updateIcon()
    this.handleSidePanelClose()
    this.setState({ frameAnimate: false, popupAnimate: false }, () => {
      setTimeout(() => {
        this.setState({ popupAnimate: true }, () => {
          setTimeout(this.props.onClose, 400)
        })
      }, 400)
    })
  }

  handleClose () {
    this.setState({ isLoading: false })
    this.handleAnimateBeforeClose()
  }

  handleKeyDown (event) {
    if (event.code === 'Escape' || event.which === ESC_KEY_CODE) {
      this.handleAnimateBeforeClose()
    }
  }

  handleMessage (event) {
    broadcastMessage(this.props.embedId, event)
  }

  handleAutoClose (event) {
    const canSetAutocloseDelay =
      event.detail.isProPlus || event.detail.canSetAutocloseDelay
    const { isAutoCloseEnabled, autoClose } = this.props.options
    const timeout =
      (canSetAutocloseDelay ? autoClose : DEFAULT_AUTOCLOSE_TIMEOUT) * 1000

    if (isAutoCloseEnabled) {
      setTimeout(() => {
        this.handleAnimateBeforeClose()
      }, timeout)
    }
  }

  handleTransitionEnd (event) {
    if (event.target === this.wrapper) {
      this.setState({
        transitionEnded: this.state.frameAnimate
      })
    }
  }

  handleFormSubmit (event) {
    if (this.props.options.onSubmit) {
      this.props.options.onSubmit(getSubmitEventData(event))
    }
  }

  handleSidePanelOpen () {
    const { mode, container, width, height } = this.props.options
    if (mode === SIDE_PANEL) {
      container.style.width = `${width}px`
      container.style.height = `${height}px`
    }
  }

  handleSidePanelClose () {
    const { mode, container } = this.props.options
    if (mode === SIDE_PANEL) {
      container.style.width = 0
    }
  }

  render () {
    let iframeStyles = null
    const { embedId, options, url } = this.props
    const { width, height, hideScrollbars, isContained, mode, size } = options

    if (hideScrollbars) {
      iframeStyles = {
        width: `calc(100% + ${ScrollbarWidth()}px)`
      }
    }

    if (mode === POPUP) {
      iframeStyles = {
        ...iframeStyles,
        WebkitMaskImage: '-webkit-radial-gradient(circle, white, black)',
        WebkitTransform: 'translateZ(0)'
      }
    }

    const iframeUrl = updateQueryStringParameter('typeform-embed-id', embedId, url)

    const Wrapper = this.getWrapperComponent(mode)
    const CloseImage = this.getCloseImage(mode)

    const showSmallPopup = mode === POPOVER || mode === SIDE_PANEL

    const wrappedForm = (
      <Wrapper
        data-qa={`popup-mode-${mode}`}
        height={height}
        innerRef={this.setWrapperRef}
        isContained={isContained}
        mode={mode}
        onTransitionEnd={this.handleTransitionEnd}
        open={this.state.frameAnimate && !this.state.isLoading}
        size={size}
        width={width}
      >
        {!showSmallPopup && this.state.iframeLoaded && (
          <CloseImage
            alt='close-typeform'
            data-qa='popup-close-button'
            mode={mode}
            onClick={this.handleAnimateBeforeClose}
            src={closeImg}
          />
        )}
        <Iframe
          onLoad={this.handleIframeLoad}
          src={iframeUrl}
          style={iframeStyles}
        />
      </Wrapper>
    )

    if (showSmallPopup) {
      return wrappedForm
    }

    return (
      <Overlay appearing={this.state.popupAnimate} isContained={isContained}>
        <Spinner stopped={this.state.iframeLoaded} />
        {wrappedForm}
      </Overlay>
    )
  }
}

Popup.propTypes = {
  icon: PropTypes.func,
  embedId: PropTypes.string,
  height: PropTypes.number,
  onClose: PropTypes.func,
  options: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number
}

export default Popup
