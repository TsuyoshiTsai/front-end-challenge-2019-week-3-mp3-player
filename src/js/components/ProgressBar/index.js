import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { fromEvent } from 'rxjs'
import { tap, switchMap, takeUntil } from 'rxjs/operators'

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
const calculateNewPercentage = (eventDOM, clientX) => {
  const { left, width: denominator } = eventDOM.getBoundingClientRect()
  const molecule = Math.floor(clientX - left)

  return (molecule / denominator) * 100
}

export const propTypes = {
  percentage: PropTypes.number,
  onSliderChange: PropTypes.func,
  onSliderChangeStart: PropTypes.func,
  onSliderChangeEnd: PropTypes.func,
  className: PropTypes.string,
}

export const defaultProps = {
  percentage: 0,
}

function ProgressBar (props) {
  const { percentage, onSliderChange, onSliderChangeStart, onSliderChangeEnd, className, ...restProps } = props

  const [isActive, setIsActive] = useState(false)
  const progressBarRef = useRef(null)

  useEffect(() => {
    const handleSliderChange = event => {
      setIsActive(true)

      if (typeof onSliderChange === 'function') {
        onSliderChange(event, calculateNewPercentage(progressBarRef.current, event.clientX))
      }
    }

    const progressBarMouseDown$ = fromEvent(progressBarRef.current, 'mousedown')
    const bodyMouseUp$ = fromEvent(document.body, 'mouseup').pipe(
      tap(event => {
        if (!progressBarRef.current.contains(event.target)) {
          setIsActive(false)
        }

        if (typeof onSliderChangeEnd === 'function') {
          onSliderChangeEnd(event)
        }
      })
    )
    const bodyMouseMove$ = fromEvent(document.body, 'mousemove')

    // 按下 progress bar 時，移動 slider 的位置
    progressBarMouseDown$.subscribe(event => handleSliderChange(event))
    // 按住 progress bar 時，監聽 body 的滑鼠移動事件，移動 slider 的位置
    progressBarMouseDown$
      .pipe(
        tap(event => {
          if (typeof onSliderChangeStart === 'function') {
            onSliderChangeStart(event)
          }
        }),
        switchMap(event => bodyMouseMove$.pipe(takeUntil(bodyMouseUp$)))
      )
      .subscribe(event => handleSliderChange(event))
  }, [onSliderChange, onSliderChangeEnd, onSliderChangeStart])

  const context = { isActive, percentage }

  return (
    <ProgressBarContext.Provider value={context}>
      <div
        ref={progressBarRef}
        className={cx('progress-bar', className)}
        onMouseEnter={event => setIsActive(true)}
        onMouseLeave={event => setIsActive(false)}
        {...restProps}
      >
        <Background>
          <Foreground />
          {isActive && <Slider />}
        </Background>
      </div>
    </ProgressBarContext.Provider>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
