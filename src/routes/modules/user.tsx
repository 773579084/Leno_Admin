import React from 'react'
import Layout from '@/Layout'
import User from '@/views/user/profile'

export default {
  element: <Layout />,
  path: '',
  hidden: true,
  children: [
    {
      path: '/user',
      element: <User />,
      name: 'user',
      meta: {
        title: '个人中心',
      },
    },
  ],
}
