import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import ProgressBar, { propTypes as ProgressBarPropTypes } from '@components/ProgressBar'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  currentTime: PropTypes.string,
  duration: PropTypes.string,
  progressBarProps: PropTypes.shape(ProgressBarPropTypes),
  className: PropTypes.string,
}

export const defaultProps = {}

function PlaybackBar (props) {
  const { currentTime, duration, progressBarProps = {}, className, ...restProps } = props

  return (
    <div className={cx('player-controls-playback-bar', className)} {...restProps}>
      <span className={cx('player-controls-playback-bar__progress-time')}>{currentTime}</span>
      <ProgressBar {...progressBarProps} />
      <span className={cx('player-controls-playback-bar__progress-time')}>{duration}</span>
    </div>
  )
}

PlaybackBar.propTypes = propTypes
PlaybackBar.defaultProps = defaultProps

export default PlaybackBar
