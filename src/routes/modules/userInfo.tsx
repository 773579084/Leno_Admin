import React from 'react'
import Layout from '@/Layout'
import lazyLoad from '@/routes/utils/lazyLoad'

export default {
  element: <Layout />,
  path: '',
  hidden: true,
  children: [
    {
      path: '/user',
      element: lazyLoad(React.lazy(() => import('@/views/user/profile'))),
      name: 'user',
      meta: {
        title: '个人中心',
      },
    },
  ],
}
