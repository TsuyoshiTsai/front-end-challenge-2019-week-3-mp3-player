import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import ProgressBar from '@components/ProgressBar'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

export const defaultProps = {}

function PlaybackBar (props) {
  const { className, ...restProps } = props

  return (
    <div className={cx('player-controls-playback-bar', className)} {...restProps}>
      <ProgressBar />
    </div>
  )
}

PlaybackBar.propTypes = propTypes
PlaybackBar.defaultProps = defaultProps

export default PlaybackBar
