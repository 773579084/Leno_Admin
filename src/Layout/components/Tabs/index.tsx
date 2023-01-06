import { message, Tabs } from 'antd'
import React, { useEffect } from 'react'
const { TabPane } = Tabs
import { HomeOutlined, CloseOutlined } from '@ant-design/icons'
import classes from './index.module.scss'
import { HOME_URL } from '@/config/config'
import { useNavigate, useLocation } from 'react-router-dom'
import { commentRoutes } from '@/routes'
import { IRoute } from '@/type'
import DelTabs from './components/DelTabs'
// mobx
import useStore from '@/store'
import { observer } from 'mobx-react-lite'

const TabsCom = () => {
  const {
    useLayoutStore: { defaultObjMobx, changeTabsListMobx },
  } = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const tabsArr = defaultObjMobx.tabsListMobx

  //#region  add tabsArr
  useEffect(() => {
    addTabsArr()
  }, [pathname])

  const addTabsArr = () => {
    let route: IRoute = {}
    // 找出当前面包屑路由
    const currentPath = pathname.split('/')[pathname.split('/').length - 1]

    commentRoutes.forEach((item) => {
      if (JSON.stringify(item).indexOf(currentPath) !== -1) route = item as any
    })

    // 递归获得 tab
    createTab(route)
    function createTab(route: IRoute) {
      route.children &&
        route.children.forEach((item) => {
          // 判断当前的pathname
          let isSetTab = false
          tabsArr.forEach((tab) => {
            if (tab.path === pathname) {
              isSetTab = true
              return
            }
          })
          if (!isSetTab) {
            let routePath = item.path?.split('/') as string[]
            if (!routePath[0]) routePath[0] = routePath[1]
            routePath[0] === currentPath &&
              changeTabsListMobx([
                ...tabsArr,
                { path: pathname, title: item.meta?.title as string },
              ])
          }
          if (item.children) createTab(item)
        })
    }
  }
  //#endregion

  const navigateFn = (path: string) => {
    // 此处默认返回子元素的key
    navigate(path)
  }

  // del tab
  const delTabFn = (e: any, path: string, delTabType?: string) => {
    // 如果未首页，提示不可删除
    e.stopPropagation()
    let newTabs: any = []
    if (delTabType === 'all') {
      newTabs = tabsArr.filter((item) => item.path === HOME_URL)
      navigate(HOME_URL)
    }
    if (delTabType === 'otherAll') {
      newTabs = tabsArr.filter((item) => item.path === path || item.path === HOME_URL)
    }
    if (!delTabType) {
      if (path === HOME_URL) return message.warning('首页不可删除！')
      const currentIndex = tabsArr.findIndex((item) => item.path === path)
      newTabs = tabsArr.filter((item) => item.path !== path)
      if (path === pathname) navigate(tabsArr[currentIndex - 1].path as string)
    }
    changeTabsListMobx(newTabs)
  }

  // 渲染 标签页
  const items = () => {
    let tabs = [] as any
    tabsArr.forEach((item) => {
      tabs.push({
        label: (
          <span>
            {item.path === HOME_URL ? <HomeOutlined /> : ''}
            {item.title}
            {item.path !== HOME_URL ? (
              <CloseOutlined
                className={classes['del-icon']}
                onClick={(e) => delTabFn(e, item.path as string)}
              />
            ) : null}
          </span>
        ),
        key: item.path,
      })
    })
    return tabs
  }

  return (
    <div className={classes['layout-tabs']}>
      <Tabs activeKey={pathname} onChange={navigateFn} items={items()}></Tabs>
      <DelTabs delTabFn={delTabFn} />
    </div>
  )
}

export default observer(TabsCom)
