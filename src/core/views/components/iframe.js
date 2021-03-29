import React, { Component } from 'react'
import PropTypes from 'prop-types'

import embedPermissions from '../../utils/embed-permissions'

class Iframe extends Component {
  constructor(props) {
    super(props)

    this.iframeRef = null
    this.handleLoad = this.handleLoad.bind(this)
    this.triggerIframeRedraw = this.triggerIframeRedraw.bind(this)
    this.getRef = this.getRef.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.src !== this.props.src
  }

  getRef(node) {
    this.iframeRef = node
  }

  async handleLoad() {
    await Promise.resolve(this.props.onLoad(this.iframeRef))
    await this.triggerIframeRedraw()
  }

  /**
   * Tell browser to redraw the iframe. DIST-713.
   *
   */
  triggerIframeRedraw() {
    return new Promise((resolve, reject) => {
      if (!this.iframeRef) {
        resolve()
        return
      }
      try {
        this.iframeRef.style.transform = 'rotateZ(0)'
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  render() {
    const { style, ...rest } = this.props
    return (
      <iframe
        {...rest}
        allow={embedPermissions}
        data-qa="iframe"
        frameBorder="0"
        height="100%"
        onLoad={this.handleLoad}
        ref={this.getRef}
        src={this.props.src}
        style={{ border: 0, ...style }}
        title="typeform-embed"
        width="100%"
      />
    )
  }
}

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  style: PropTypes.object,
}

Iframe.defaultProps = {
  onLoad: () => {},
}

export default Iframe
