import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from './components/Button'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Controls (props) {
  const { className, ...restProps } = props

  return <div className={cx('player-controls', className)} {...restProps} />
}

Controls.propTypes = propTypes

Controls.Button = Button

export default Controls
