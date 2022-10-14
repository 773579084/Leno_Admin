import React from 'react'
import Layout from '@/Layout'
import Test from '@/views/test2'

export default {
  element: <Layout />,
  path: '',
  children: [
    {
      path: '/test2',
      element: <Test />,
      meta: {
        requireAuth: false,
        title: '测试 2',
        icon: 'test',
      },
    },
  ],
}
