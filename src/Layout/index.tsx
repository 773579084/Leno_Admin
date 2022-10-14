import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
const { Sider } = Layout
import classes from './index.module.scss'
/* 组件 */
import MenuCom from './components/Menu'
import HeaderCom from './components/Header'
import ContentCom from './components/Content'
import TabsCom from './components/Tabs'

const LayoutCom = () => {
  // control Sider
  const [collapsed, setCollapsed] = useState(false)

  // listen window size change
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth
        if (collapsed === false && screenWidth < 1200) setCollapsed(true)
        if (collapsed === false && screenWidth > 1200) setCollapsed(false)
      })()
    }
  }

  // init mounted
  useEffect(() => {
    listeningWindow()
  }, [])

  return (
    /**
     * 此处不要使用 layout 包裹整个 sider、header、content，会导致layout闪烁
     * 此处需要将 silder 与 header&&content 分开布置，可以解决闪烁问题
     */
    <div className={classes['layout-container']}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className={classes.logo}>
          <div className={classes['logo-image']}></div>
          {!collapsed && <div className={classes['logo-font']}>Leno Admin</div>}
        </div>
        <MenuCom />
      </Sider>
      <Layout className={classes['site-layout']}>
        <HeaderCom collapsed={collapsed} setCollapsed={setCollapsed} />
        <TabsCom />
        <ContentCom />
      </Layout>
    </div>
  )
}

export default LayoutCom
