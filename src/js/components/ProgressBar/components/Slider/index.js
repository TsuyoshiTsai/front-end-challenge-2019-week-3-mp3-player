import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Lib MISC
import { ProgressBarContext } from '../../context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {}

function Slider (props) {
  const { style, className, ...restProps } = props

  const context = useContext(ProgressBarContext)

  return <div className={cx('progress-bar-slider', className)} style={{ ...style, left: `${context.percentage}%` }} {...restProps} />
}

Slider.propTypes = propTypes
Slider.defaultProps = defaultProps

export default Slider
