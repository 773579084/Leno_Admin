import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getUserAPI } from '@/api/modules/user'
import { IuserInfo } from '@/type'
// mobx
import useStore from '@/store'
import { getToken } from '@/utils'

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */

// // 设置白名单
const whitePaths = ['/login', '/404', '/500']
// 路由守卫配置函数
export const AuthRouter = (props: any) => {
  const { pathname } = useLocation()
  let {
    useUserStore: { setUserInfo, userInfo },
  } = useStore()

  // 第一步 判断有无 token
  if (getToken()) {
    // 第二步 判断是否前往login页面，等于跳转 '/', 不等于则继续判断
    if (pathname === '/login') {
      return <Navigate to="/" replace />
    } else {
      // 第三步 判断是否拿到用户个人信息及权限，没拿到则进行axios请求数据，进行信息存储及权限路由渲染，否则直接放行
      // 该版本为基础版，这些数据展示都为链接，后续会逐步更新
      if (Object.keys(userInfo).length < 1 || !userInfo) {
        // 获取用户个人信息 (此处使用 async await会报错)
        getUserAPI()
          .then((res) => {
            const { result } = res.data as any
            setUserInfo(result as IuserInfo)
          })
          .catch((err) => {})
        // 合并路由
        return props.children
      } else {
        return props.children
      }
    }
  } else {
    if (whitePaths.includes(pathname)) {
      return props.children
    } else {
      return <Navigate to="/login" replace />
    }
  }
}
