import React from 'react'
import Home from '@/views/home'
import { HOME_URL } from '@/config/config'
import Layout from '@/Layout'

export default {
  path: '',
  element: <Layout />,
  children: [
    {
      path: HOME_URL,
      element: <Home />,
      meta: {
        title: '首页',
        icon: 'home',
      },
    },
  ],
}
