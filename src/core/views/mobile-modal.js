import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'

import setupGoogleAnalyticsInstanceSharingFeature from '../features/google-analytics-instance-sharing'

import CloseIcon from './components/close-icon'
import Iframe from './components/iframe'
import {
  broadcastMessage,
  callIfEmbedIdMatches,
  redirectToUrl,
  updateQueryStringParameter,
  getSubmitEventData
} from './../utils'
import { DEFAULT_AUTOCLOSE_TIMEOUT } from './popup'

const Wrapper = styled.div`
  visibility: ${p => (p.open ? 'visible' : 'hidden')};
  opacity: ${p => (p.open ? 1 : 0)};
  background-color: ${p => p.backgroundColor};
  position: fixed !important;
  z-index: 10001;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  overflow: hidden !important;
  height: 100%;
  transition: all 400ms ease ${props => props.openDelay}s;
`

const GlobalStyle = createGlobalStyle`
  .__typeform-embed-mobile-modal-open {
    overflow: hidden !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }
`

class MobileModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      backgroundColor: props.backgroundColor,
      buttonColor: props.buttonColor
    }

    this.handleMessage = this.handleMessage.bind(this)
    this.handleFormReady = callIfEmbedIdMatches(this.handleFormReady.bind(this), this.props.embedId)
    this.handleAutoClose = callIfEmbedIdMatches(this.handleAutoClose.bind(this), this.props.embedId)
    this.handleFormSubmit = callIfEmbedIdMatches(this.handleFormSubmit.bind(this), this.props.embedId)
    this.handleFormTheme = callIfEmbedIdMatches(this.handleFormTheme.bind(this), this.props.embedId)
    this.handleClose = this.handleClose.bind(this)
    this.setIframeRef = this.setIframeRef.bind(this)
  }

  componentDidMount () {
    window.addEventListener('message', this.handleMessage)
    window.addEventListener('form-ready', this.handleFormReady)
    window.addEventListener('embed-auto-close-popup', this.handleAutoClose)
    window.addEventListener('form-submit', this.handleFormSubmit)
    window.addEventListener('form-theme', this.handleFormTheme)
    window.addEventListener('redirect-after-submit', redirectToUrl)
    window.addEventListener('thank-you-screen-redirect', redirectToUrl)

    if (this.props.open) {
      this.open()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.open && this.props.open) {
      this.open()
    }

    if (
      prevProps.backgroundColor !== this.props.backgroundColor ||
      prevProps.buttonColor !== this.props.buttonColor
    ) {
      this.setState({
        backgroundColor: this.props.backgroundColor,
        buttonColor: this.props.buttonColor
      })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleMessage)
    window.removeEventListener('form-ready', this.handleFormReady)
    window.removeEventListener('embed-auto-close-popup', this.handleAutoClose)
    window.removeEventListener('form-submit', this.handleFormSubmit)
    window.removeEventListener('form-theme', this.handleFormTheme)
    window.removeEventListener('redirect-after-submit', redirectToUrl)
    window.removeEventListener('thank-you-screen-redirect', redirectToUrl)

    document.body.classList.remove('__typeform-embed-mobile-modal-open')
  }

  setIframeRef (node) {
    this.iframe = node
  }

  setupGoogleAnalyticsInstanceSharingFeature () {
    if (this.props.options.shareGoogleAnalyticsInstance) {
      const { iframeRef } = this.iframe
      const canPostMessage =
      this.state.isFormReady &&
      iframeRef.contentWindow != null
      if (canPostMessage) {
        setupGoogleAnalyticsInstanceSharingFeature(iframeRef, this.props.embedId)
      }
    }
  }

  handleMessage (event) {
    broadcastMessage(this.props.embedId, event)
  }

  handleAutoClose (event) {
    const canSetAutocloseDelay =
      event.detail.isProPlus || event.detail.canSetAutocloseDelay
    const {
      isAutoCloseEnabled,
      autoClose = DEFAULT_AUTOCLOSE_TIMEOUT
    } = this.props
    const timeout =
      (canSetAutocloseDelay ? autoClose : DEFAULT_AUTOCLOSE_TIMEOUT) * 1000

    if (isAutoCloseEnabled) {
      setTimeout(() => {
        this.handleClose()
      }, timeout)
    }
  }

  handleFormSubmit (event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(getSubmitEventData(event))
    }
  }

  handleFormTheme (event) {
    const { theme } = event.detail || {}
    this.setState({
      backgroundColor: theme.backgroundColor,
      buttonColor: theme.color
    })
  }

  open () {
    setTimeout(() => {
      this.originalBodyScrollTop = window.document.body.scrollTop
      document.body.classList.add('__typeform-embed-mobile-modal-open')
    }, this.props.openDelay * 1000 + 500)
  }

  handleClose () {
    document.body.classList.remove('__typeform-embed-mobile-modal-open')
    setTimeout(() => {
      window.document.body.scrollTop = this.originalBodyScrollTop
    }, 40)

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  handleFormReady () {
    this.setState(
      {
        isFormReady: true
      },
      () => {
        this.setupGoogleAnalyticsInstanceSharingFeature()
      }
    )
  }

  render () {
    const { embedId, url, open } = this.props
    const { backgroundColor, buttonColor } = this.state

    const iframeUrl = updateQueryStringParameter(
      'typeform-embed-id',
      embedId,
      url
    )

    return (
      <Wrapper
        backgroundColor={backgroundColor}
        data-qa='mobile-modal'
        open={open}
        openDelay={this.props.openDelay}
      >
        <GlobalStyle />
        {open && <Iframe ref={this.setIframeRef} src={iframeUrl} />}
        <CloseIcon
          color={buttonColor}
          dataQa='close-button-mobile'
          onClick={this.handleClose}
        />
      </Wrapper>
    )
  }
}

MobileModal.propTypes = {
  url: PropTypes.string,
  open: PropTypes.bool,
  options: PropTypes.object,
  isAutoCloseEnabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  autoClose: PropTypes.number,
  openDelay: PropTypes.number,
  embedId: PropTypes.string
}

MobileModal.defaultProps = {
  open: false,
  openDelay: 0,
  autoClose: null,
  backgroundColor: 'transparent',
  buttonColor: '#FFF',
  options: {}
}

export default MobileModal
