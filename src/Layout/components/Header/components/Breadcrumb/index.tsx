import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import classes from './index.module.scss'
import { commentRoutes } from '@/routes/index'
// mobx
import useStore from '@/store'
import { IRoute } from '@/type'
import { HOME_URL } from '@/config/config'

const BreadcrumbCom = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    useLayoutStore: { changeBreadCrumbListFn, defaultObjMobx },
  } = useStore()
  const [newBreadcrumbArr, setNewBreadcrumbArr] = useState(defaultObjMobx.breadcrumbListMobx)
  let breadcrumbArr: string[] = []

  // 遍历找处路径 title 数组
  const currentBreadArr = (route: IRoute) => {
    route.meta && breadcrumbArr.push(route.meta.title)
    if (route.children) {
      route.children.forEach((item: IRoute) => {
        if (pathname.indexOf(item.path as string) !== -1) currentBreadArr(item)
      })
    }
  }

  useEffect(() => {
    let route: IRoute = {}
    const currentPath = pathname.split('/')[pathname.split('/').length - 1]
    // 找出当前面包屑路由
    commentRoutes.forEach((item) => {
      if (JSON.stringify(item).indexOf(currentPath) !== -1) route = item
    })
    // 拼接面包屑的路径
    currentBreadArr(route)
    setNewBreadcrumbArr(breadcrumbArr)
    changeBreadCrumbListFn(breadcrumbArr)
  }, [pathname])

  return (
    <Breadcrumb className={classes['bread-crumb']} style={{ marginLeft: 16 }}>
      <Breadcrumb.Item
        className={pathname === HOME_URL ? classes['current-home'] : classes.home}
        onClick={() => navigate(HOME_URL)}
      >
        首页
      </Breadcrumb.Item>
      {pathname === HOME_URL
        ? null
        : newBreadcrumbArr.map((item, index) => {
            return (
              <Breadcrumb.Item
                className={
                  newBreadcrumbArr.length - 1 === index
                    ? classes['current-bread']
                    : classes['nocurrent-bread']
                }
                key={index}
              >
                {item}
              </Breadcrumb.Item>
            )
          })}
    </Breadcrumb>
  )
}

export default BreadcrumbCom
