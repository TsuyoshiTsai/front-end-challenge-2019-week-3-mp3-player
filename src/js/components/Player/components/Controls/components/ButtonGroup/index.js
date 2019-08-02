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

function ButtonGroup (props) {
  const { className, ...restProps } = props

  return <div className={cx('player-controls-button-group', className)} {...restProps} />
}

ButtonGroup.propTypes = propTypes
ButtonGroup.defaultProps = defaultProps

export default ButtonGroup
