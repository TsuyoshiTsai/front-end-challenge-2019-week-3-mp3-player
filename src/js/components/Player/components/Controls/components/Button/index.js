import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isActive: PropTypes.bool,
  isCircled: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {}

function Button (props) {
  const { isActive, isCircled, className, ...restProps } = props

  return <button className={cx('player-controls-button', className)} data-is-circled={isCircled} data-is-active={isActive} {...restProps} />
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
