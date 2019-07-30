import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isFlexbox: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.object,
  className: PropTypes.string,
}

function Footer (props) {
  const { isFlexbox, align, style, className, ...restProps } = props

  return (
    <footer className={cx('layout-footer', className)} style={{ display: isFlexbox && 'flex', justifyContent: align, ...style }} {...restProps} />
  )
}

Footer.propTypes = propTypes

export default Footer
