import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from '../../styles'

const Root = styled.div`
  position: absolute;
  z-index: 1001;
  top: 0;
  right: 0;
  font-size: 20px;
  font-family: sans-serif;
  width: 50px;
  height: 50px;
`

const closeArrow = css`
  border-radius: 0;
  display: block;
  height: 2px;
  width: 25px;
  position: absolute;
  right: 6px;
  top: 6px;
`

const ArrowLeft = styled.span`
  ${closeArrow}
  background-color: ${p => p.backgroundColor};
  transform: translate(0, 13px) rotate3d(0, 0, 1, -135deg);
`

const ArrowRight = styled.span`
  ${closeArrow}
  background-color: ${p => p.backgroundColor};
  transform: translate(0, 13px) rotate3d(0, 0, 1, -45deg);
`

const CloseIcon = ({ color, onClick, dataQa }) => (
  <Root data-qa={dataQa} onClick={onClick}>
    <ArrowLeft backgroundColor={color} />
    <ArrowRight backgroundColor={color} />
  </Root>
)

CloseIcon.propTypes =
  {
    color: PropTypes.string,
    dataQa: PropTypes.string,
    onClick: PropTypes.func
  }

export default CloseIcon
