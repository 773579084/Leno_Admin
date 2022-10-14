import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { IDefaultObj, ITab } from '@/type'
import { HOME_URL } from '@/config/config'

export default class useGlobalStore {
  defaultObjMobx: IDefaultObj = {
    selectedKeysMobx: [HOME_URL],
    openKeysMobx: [], // 实时展开数组
    useEffectOpenKeysMobx: [], // 多级目录状态存储
    breadcrumbListMobx: ['首页'],
    tabsListMobx: [{ path: HOME_URL, title: '首页' }],
  }

  constructor() {
    makeAutoObservable(this)
    // 持久化
    makePersistable(this, {
      name: 'LenoAdmin_dev_1.0.0_defaultObjMobx',
      properties: ['defaultObjMobx'],
      storage: window.localStorage,
    })
  }

  // change tabsListMobx
  changeTabsListMobx = (newTabs: ITab[]) => {
    this.defaultObjMobx.tabsListMobx = newTabs
  }

  // change defaultSelectedMobx
  changeSelectedKeys = (pathArr: string[]) => {
    this.defaultObjMobx.selectedKeysMobx = pathArr
  }

  // change breadcrumbListMobx
  changeBreadCrumbListFn = (breadArr: string[]) => {
    this.defaultObjMobx.breadcrumbListMobx = breadArr
  }

  // change useEffectOpenKeysMobx
  changeUseEffectOpenKeysMobx = (menuArr: string[]) => {
    this.defaultObjMobx.useEffectOpenKeysMobx = menuArr
  }

  // change openKeysMobx
  changeOpenKeys = (keys: string[]) => {
    this.defaultObjMobx.openKeysMobx = keys
  }
}
