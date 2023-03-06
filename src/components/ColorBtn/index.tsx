import React, { MouseEventHandler, ReactNode } from 'react'
import classes from './index.module.scss'
import { Button } from 'antd'

const ColorBtn = (props: {
  block: boolean
  disabled: boolean
  href: string
  target: string
  shape: 'default' | 'circle' | 'round'
  size: 'large' | 'middle' | 'small'
  icon: ReactNode
  // btn 颜色种类
  color: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  loading: boolean
  // 插槽
  children: string | null
  onClick: MouseEventHandler<HTMLElement>
}) => {
  const { block, disabled, href, target, shape, size, icon, color, loading, onClick, children } =
    props

  const styleClassFn = (): string => {
    if (color === 'primary' && !disabled) {
      return classes['primary-color-normal']
    } else if (color === 'primary' && disabled) {
      return classes['primary-color-disabled']
    }

    if (color === 'success' && !disabled) {
      return classes['success-color-btn']
    } else if (color === 'success' && disabled) {
      return classes['success-color-disabled']
    }

    if (color === 'danger' && !disabled) {
      return classes['danger-color-btn']
    } else if (color === 'danger' && disabled) {
      return classes['danger-color-disabled']
    }

    if (color === 'info' && !disabled) {
      return classes['info-color-btn']
    } else if (color === 'info' && disabled) {
      return classes['info-color-disabled']
    }

    if (color === 'warning' && !disabled) {
      return classes['warning-color-btn']
    } else if (color === 'warning' && disabled) {
      return classes['warning-color-disabled']
    }

    return classes['primary-color-normal']
  }

  return (
    <span className={styleClassFn()}>
      <Button
        block={block}
        disabled={disabled}
        href={href}
        target={target}
        shape={shape}
        size={size}
        icon={icon}
        loading={loading}
        onClick={onClick}
      >
        {children}
      </Button>
    </span>
  )
}

ColorBtn.defaultProps = {
  color: 'primary',
  block: false,
  disabled: false,
  href: null,
  target: null,
  icon: null,
  loading: false,
  shape: 'default',
  children: null,
  size: 'middle',
  onClick: () => {},
}

export default ColorBtn
