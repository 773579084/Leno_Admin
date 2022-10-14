import React from 'react'
// ant
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
const { Header } = Layout
import classes from './index.module.scss'
// types
import { PropsType } from '@/type'
// components
import AvatarCom from './components/AvatarCom'
import ScreenFull from './components/ScreenFull'
import BreadcrumbCom from './components/Breadcrumb'

const HeaderCom: React.FC<PropsType> = ({ collapsed, setCollapsed }) => {
  return (
    <div className={classes['site-layout-background']}>
      <Header style={{ padding: 0 }}>
        <div className="header-left">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <BreadcrumbCom />
        </div>
        <div className="header-right">
          <ScreenFull />
          <AvatarCom />
        </div>
      </Header>
    </div>
  )
}
export default HeaderCom
