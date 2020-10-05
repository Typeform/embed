import React, { Component } from 'react'
import PropTypes from 'prop-types'

import embedPermissions from '../../utils/embed-permissions'

class Iframe extends Component {
  constructor (props) {
    super(props)

    this.iframeRef = null
    this.handleLoad = this.handleLoad.bind(this)
    this.getRef = this.getRef.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.src !== this.props.src
  }

  getRef (node) {
    this.iframeRef = node
  }

  handleLoad () {
    this.props.onLoad && this.props.onLoad(this.iframeRef)
  }

  render () {
    const { style, ...rest } = this.props
    return (
      <iframe
        {...rest}
        allow={embedPermissions}
        data-qa='iframe'
        frameBorder='0'
        height='100%'
        onLoad={this.handleLoad}
        ref={this.getRef}
        src={this.props.src}
        style={{ border: 0, ...style }}
        title='typeform-embed'
        width='100%'
      />
    )
  }
}

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  style: PropTypes.object
}

export default Iframe
