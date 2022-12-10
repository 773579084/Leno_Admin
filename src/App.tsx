import React from 'react'
/* 引入路由表 */
import Router from '@/routes'
/* 引入工具函数 */
import '@/assets/style/App.css'
import { AuthRouter } from '@/utils'
/* 全局 Loading */
import Loading from '@/components/Loading'
import '@/assets/style/index.scss'

export default function App() {
  return (
    <div style={{ height: 100 + '%' }}>
      {/* 注册路由 */}
      <AuthRouter>
        <Router />
      </AuthRouter>
      {/* Loaing */}
      <Loading />
    </div>
  )
}
