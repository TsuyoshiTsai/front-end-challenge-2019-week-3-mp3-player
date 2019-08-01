import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Background from './components/Background'
import Foreground from './components/Foreground'
import Slider from './components/Slider'

// Lib MISC
import { ProgressBarContext } from './context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  percentage: PropTypes.number,
  className: PropTypes.string,
}

export const defaultProps = {
  percentage: 0,
}

function ProgressBar (props) {
  const { percentage, className, ...restProps } = props
  const [isActive, setIsActive] = useState(true)

  const context = { percentage }

  return (
    <ProgressBarContext.Provider value={context}>
      <div
        className={cx('progress-bar', className)}
        onMouseEnter={event => setIsActive(true)}
        onMouseLeave={event => setIsActive(false)}
        {...restProps}
      >
        <Background>
          <Foreground isActive={isActive} />
          {isActive && <Slider />}
        </Background>
      </div>
    </ProgressBarContext.Provider>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
