import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '@components/Typography'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.node,
  titleProps: PropTypes.object,
  description: PropTypes.node,
  descriptionProps: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

function Meta (props) {
  const { title, titleProps = {}, description, descriptionProps = {}, className, children, ...restProps } = props

  return (
    <div className={cx('track-meta', className)} {...restProps}>
      <Typography.Title level='h2' color='white' align='center' marginBottom={8} {...titleProps}>
        {title}
      </Typography.Title>
      <Typography.Text color='white' align='center' {...descriptionProps}>
        {description}
      </Typography.Text>
    </div>
  )
}

Meta.propTypes = propTypes

export default Meta
