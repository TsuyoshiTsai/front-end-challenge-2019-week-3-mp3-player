import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '@components/Typography'
import Meta from './components/Meta'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  withBorder: PropTypes.bool,
  isSelectable: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  padding: `10px 0`,
}

function Item (props) {
  const { withBorder, isSelectable, padding, style, className, ...restProps } = props

  return (
    <Typography.Text
      isBlock
      className={cx('list-item', className)}
      style={{ padding, ...style }}
      data-with-border={withBorder}
      data-is-selectable={isSelectable}
      {...restProps}
    />
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

Item.Meta = Meta

export default Item
