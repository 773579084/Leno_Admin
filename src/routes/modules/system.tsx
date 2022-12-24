import React from 'react'
import Layout from '@/Layout'
import lazyLoad from '@/routes/utils/lazyLoad'

export default {
  element: <Layout />,
  path: '/system',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'test',
  },
  children: [
    {
      path: 'User',
      element: lazyLoad(React.lazy(() => import('@/views/system/user'))),
      name: 'User',
      meta: {
        title: '用户管理',
        icon: 'test',
      },
    },
    {
      path: 'Role',
      element: lazyLoad(React.lazy(() => import('@/views/system/role'))),
      name: 'Role',
      meta: {
        title: '角色管理',
        icon: 'test',
      },
    },
  ],
}
