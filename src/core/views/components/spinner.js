import 'spin.js/spin.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spinner as Spin } from 'spin.js'

const defaultConfig = {
  lines: 16,
  length: 3,
  width: 3,
  radius: 14,
  color: '#FFFFFF',
  speed: 2.1,
  trail: 60,
  shadow: false,
  hwaccel: false,
  top: '50%',
  left: '50%',
  position: 'absolute',
  zIndex: 999
}

class Spinner extends Component {
  constructor (props) {
    super(props)

    this.getRef = this.getRef.bind(this)
  }

  componentDidMount () {
    this.instantiateSpinner(this.props)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.config.color !== this.props.config.color) {
      this.spinner.stop()
      // the Spinner API doesn't provide a method to change its options after instantiation,
      // so the only way to do so is to reinstantiate the spinner ¯\_(ツ)_/¯
      this.instantiateSpinner(newProps)
    } else {
      if (newProps.stopped === true && !this.props.stopped) {
        this.spinner.stop()
      } else if (!newProps.stopped && this.props.stopped === true) {
        this.spinner.spin(this.container)
      }
    }
  }

  componentWillUnmount () {
    this.spinner.stop()
  }

  getRef (node) {
    this.container = node
  }

  instantiateSpinner (props) {
    this.spinner = new Spin({ ...defaultConfig, ...props.config })
    if (!props.stopped) {
      this.spinner.spin(this.container)
    }
  }

  render () {
    return (
      <div ref={this.getRef} />
    )
  }
}

Spinner.propTypes = {
  config: PropTypes.object,
  stopped: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

Spinner.defaultProps = {
  config: defaultConfig,
  className: '',
  style: {}
}

export default Spinner
