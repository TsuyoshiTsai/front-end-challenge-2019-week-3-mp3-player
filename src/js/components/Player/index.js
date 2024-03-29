import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Controls from './components/Controls'
import ExtraControls from './components/ExtraControls'

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
Player.ExtraControls = ExtraControls

export default Player
