import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isCircled: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {}

function Button (props) {
  const { isCircled, className, ...restProps } = props

  return <button className={cx('player-controls-button')} data-is-circled={isCircled} {...restProps} />
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
