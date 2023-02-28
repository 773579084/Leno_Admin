import React, { MouseEventHandler, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classes from './index.module.scss'
import { Button } from 'antd'

const ColorBtn = (props: {
  block: boolean
  disabled: boolean
  href: string
  target: string
  shape: 'default' | 'circle' | 'round' | undefined
  size: 'large' | 'middle' | 'small' | undefined
  icon: ReactNode
  color: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  loading: boolean | object
  text: string | null
  onClick: MouseEventHandler<HTMLElement>
}) => {
  const { block, disabled, href, target, shape, size, icon, color, loading, onClick, text } = props

  return (
    <span>
      <Button
        block={block}
        disabled={disabled}
        href={href}
        target={target}
        shape={shape}
        size={size}
        icon={icon}
        color={color}
        loading={loading}
        onClick={onClick}
      >
        {text}
      </Button>
    </span>
  )
}

ColorBtn.propTypes = {
  block: PropTypes.bool,
  // 失效
  disabled: PropTypes.bool,
  // 跳转地址
  href: PropTypes.string,
  target: PropTypes.string,
  // icon
  icon: PropTypes.node,
  // 载入状态
  loading: PropTypes.bool || PropTypes.object,
  // 按钮形状
  shape: PropTypes.string,
  size: PropTypes.string,
  // btn 颜色种类
  color: PropTypes.string,
  //自定义方法
  onClick: PropTypes.func,
}

ColorBtn.defaultProps = {
  color: 'primary',
  block: false,
  // 失效
  disabled: false,
  // 跳转地址
  href: null,
  target: null,
  // icon
  icon: null,
  // 载入状态
  loading: false,
  // 文本
  text: null,
  // 按钮形状
  shape: 'default',
  size: 'middle',
  onClick: () => {},
}

export default ColorBtn
