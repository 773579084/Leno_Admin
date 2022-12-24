import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from '@/App'
import '@/assets/icons'
// 配置 ant-design 中文版
import zhCN from 'antd/lib/locale/zh_CN'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </HashRouter>,
  )
}
