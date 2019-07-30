import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Controls from './components/Controls'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Player (props) {
  const { className, ...restProps } = props

  return <div className={cx('player', className)} {...restProps} />
}

Player.propTypes = propTypes

Player.Controls = Controls

export default Player
