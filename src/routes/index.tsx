import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
/* 子路由 */
import Home from './modules/home'
import Test from './modules/test'
import Test2 from './modules/test2'
import User from './modules/user'

/* 路由页面 */
import Login from '@/views/login'
import Page404 from '@/views/errMessage/404'
import Page500 from '@/views/errMessage/500'

/**
 *  commentRoutes 的路由才会出现在侧边栏，主干上的路由并不会出现在侧边栏上
 * 面包屑和tabs都只会遍历 commentRoutes
 */
export const commentRoutes = [Home, Test, Test2, User]

/**
 * 路由配置项
 *
 * path:'路径'            // 路径，如果不是多级嵌套，可为 ' '
 * hidden：true           // 设置为true时不会出现在侧边栏
 * name:'router-name'     // 设定路由名，此项必填 (也是唯一标志名)
 * element：<login />     // 组件
 * alwaysShow: true       // 设置该属性为true后，侧边栏就会出现多级嵌套，否则不会出现
 * meta:{
 *   title:'title'        // 设置该路由在侧边栏和面包屑的name
 *   icon:'svg-name'      // 设置该路由的图标，对应路径 src/icons/svg
 * }
 */

export const rootRouter = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录页',
    },
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  ...commentRoutes,
  {
    path: '/404',
    element: <Page404 />,
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/500',
    element: <Page500 />,
    meta: {
      title: '500页面',
    },
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router
