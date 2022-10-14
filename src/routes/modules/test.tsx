import React from 'react'
import Layout from '@/Layout'
import Test1 from '@/views/test/test2-1/index'
import Test2 from '@/views/test/test2-2'

export default {
  element: <Layout />,
  path: '/test',
  alwaysShow: true,
  meta: {
    title: '测试',
    icon: 'test',
  },
  children: [
    {
      path: 'test1',
      meta: {
        title: '测试',
        icon: 'test',
      },
      children: [
        {
          path: 'test11',
          meta: {
            title: '测试1-1',
            icon: 'test',
          },
          children: [
            {
              path: 'test111',
              element: <Test1 />,
              meta: {
                title: '测试1-1-1',
              },
            },
            {
              path: 'test112',
              element: <Test2 />,
              meta: {
                title: '测试1-1-2',
              },
            },
            {
              path: 'test113',
              element: <Test1 />,
              meta: {
                title: '测试1-1-3',
              },
            },
          ],
        },
        {
          path: 'test12',
          element: <Test2 />,
          meta: {
            title: '测试1-2',
          },
        },
      ],
    },
  ],
}
