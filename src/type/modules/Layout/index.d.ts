// 父传子类型
export interface PropsType {
  collapsed?: boolean
  setCollapsed?: function
}

//#region 侧边栏渲染路由集合表
export type ICommentRoutes = ICommentRoute[]

export interface ICommentRoute {
  element: JSX.Element
  children: {
    path: string
    element?: JSX.Element
    meta: {
      requireAuth: boolean
      title: string
      icon: string
    }
  }[]
}
//#endregion

export interface IRoute {
  element?: JSX.Element
  alwaysShow?: boolean
  meta?: Imeta
  path?: string
  hidden?: boolean
  children?: IRoute[]
}

interface Imeta {
  menuPath?: Key
  requireAuth?: boolean
  title: string
  icon?: string
}

// mobx localStorage
export interface IDefaultObj {
  selectedKeysMobx: string[]
  openKeysMobx: string[]
  breadcrumbListMobx: string[]
  useEffectOpenKeysMobx: string[]
  tabsListMobx: ITab[]
}

export interface ITab {
  path: string
  title: string
}
