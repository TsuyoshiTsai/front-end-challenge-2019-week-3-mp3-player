import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

export const defaultProps = {}

function Background (props) {
  const { className, ...restProps } = props

  return <div className={cx('progress-bar-background', className)} {...restProps} />
}

Background.propTypes = propTypes
Background.defaultProps = defaultProps

export default Background
