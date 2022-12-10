import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from '@/App'
import '@/assets/icons'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <HashRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </HashRouter>,
  )
}
