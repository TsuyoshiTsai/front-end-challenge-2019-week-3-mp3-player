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

function Foreground (props) {
  const { style, className, ...restProps } = props

  const context = useContext(ProgressBarContext)

  return (
    <div
      className={cx('progress-bar-foreground', className)}
      style={{ ...style, transform: `translateX(-${100 - context.percentage}%)` }}
      data-is-active={context.isActive}
      {...restProps}
    />
  )
}

Foreground.propTypes = propTypes
Foreground.defaultProps = defaultProps

export default Foreground
