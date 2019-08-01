import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Meta from './components/Meta'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  imageUrl: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

function Track (props) {
  const { imageUrl, style, className, ...restProps } = props

  return <div className={cx('track', className)} style={{ ...style, backgroundImage: `url(${imageUrl})` }} {...restProps} />
}

Track.propTypes = propTypes

Track.Meta = Meta

export default Track
