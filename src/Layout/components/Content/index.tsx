import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout
import { Outlet } from 'react-router-dom'
import classes from './index.module.scss'

const ContentCom = () => {
  return (
    <Content
      className={classes['site-layout-background']}
      style={{
        margin: '0px 16px 16px',
        padding: 20,
      }}
    >
      <Outlet />
    </Content>
  )
}
export default ContentCom
