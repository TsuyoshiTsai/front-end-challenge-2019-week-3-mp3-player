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
  progressBarProps: PropTypes.shape(ProgressBarPropTypes),
  className: PropTypes.string,
}

export const defaultProps = {}

function PlaybackBar (props) {
  const { progressBarProps = {}, className, ...restProps } = props

  return (
    <div className={cx('player-controls-playback-bar', className)} {...restProps}>
      <ProgressBar {...progressBarProps} />
    </div>
  )
}

PlaybackBar.propTypes = propTypes
PlaybackBar.defaultProps = defaultProps

export default PlaybackBar
