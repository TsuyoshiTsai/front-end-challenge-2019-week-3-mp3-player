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
    <div className={cx('list-item-meta', className)} {...restProps}>
      <Typography.Title level='h5' lineHeight={1.25} marginBottom={4} shouldEllipsis {...titleProps}>
        {title}
      </Typography.Title>
      <Typography.Text color='gray-dark' size='xs' lineHeight={1.375} shouldEllipsis {...descriptionProps}>
        {description}
      </Typography.Text>
    </div>
  )
}

Meta.propTypes = propTypes

export default Meta
