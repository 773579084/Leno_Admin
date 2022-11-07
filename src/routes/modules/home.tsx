import React from 'react'
import Home from '@/views/home'
import { HOME_URL } from '@/config/config'
import Layout from '@/Layout'
import lazyLoad from '../utils/lazyLoad'

export default {
  path: '',
  element: <Layout />,
  children: [
    {
      path: HOME_URL,
      element: lazyLoad(React.lazy(() => import('@/views/home'))),
      meta: {
        title: '首页',
        icon: 'home',
      },
    },
  ],
}
