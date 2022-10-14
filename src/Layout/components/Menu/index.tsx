import React, { useState, useEffect } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
/* icon */
import { HomeOutlined, ExperimentOutlined } from '@ant-design/icons'
import { commentRoutes } from '@/routes/index'
import { ICommentRoutes, IRoute } from '@/type'
// mobx
import useStore from '@/store'

const MenuCom = () => {
  const {
    useLayoutStore: {
      changeSelectedKeys,
      changeOpenKeys,
      changeUseEffectOpenKeysMobx,
      defaultObjMobx,
    },
  } = useStore()
  const [openKeys, setOpenKeys] = useState<string[]>(defaultObjMobx.openKeysMobx)
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultObjMobx.selectedKeysMobx)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  //#region 保存 menu 展开
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
    changeOpenKeys(openKeys)
    changeUseEffectOpenKeysMobx(openKeys)
  }
  //#endregion

  type MenuItem = Required<MenuProps>['items'][number]
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type,
    } as MenuItem
  }

  // icon 映射表
  const iconObj: any = {
    home: <HomeOutlined />,
    test: <ExperimentOutlined />,
  }

  // 生成 多级 menu
  function createMenuFn(
    commentRoutes: ICommentRoutes,
    isAlwaysShow?: boolean,
    onPath: string = '',
  ) {
    const newItems: any = []

    commentRoutes.forEach((route: IRoute) => {
      if (route.alwaysShow || isAlwaysShow) {
        // 多级目录
        let frontPath: string = ''
        if (!onPath) {
          frontPath = route.path as string
        } else {
          frontPath = onPath + '/' + route.path
        }
        newItems.push(
          getItem(
            route.meta?.title,
            frontPath,
            route.meta?.icon && iconObj[route.meta?.icon],
            route.children && createMenuFn(route.children as any, true, frontPath),
          ),
        )
      } else {
        // 单级目录
        route.children?.forEach((route2: IRoute) => {
          newItems.push(
            getItem(
              route2.meta?.title,
              route2.path as string,
              iconObj[route2.meta?.icon as string],
            ),
          )
        })
      }
    })
    return newItems
  }

  const items: MenuItem[] = createMenuFn(commentRoutes as any)

  //#region  点击 item 跳转路由 && 持久化 menu 选中
  const navigateFn: MenuProps['onClick'] = (item) => {
    // 路由跳转
    navigate(item.key)
    changeSelectedKeys([item.key])
  }
  //#endregion

  // 监听当前路径变化
  useEffect(() => {
    // 判断当前路径为多级menu时展开，单级menu时多级收缩
    if (pathname.split('/').length > 3) setOpenKeys([...defaultObjMobx.useEffectOpenKeysMobx])
    if (pathname.split('/').length < 3) {
      setOpenKeys([])
      changeOpenKeys([])
    }
    // 控制menu选中变色
    setSelectedKeys([pathname])
    changeSelectedKeys([pathname])
  }, [pathname])

  return (
    <Menu
      theme="light"
      mode="inline"
      onClick={navigateFn}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  )
}

export default MenuCom
