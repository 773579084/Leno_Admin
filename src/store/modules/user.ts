import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { IuserInfo } from '@/type'

export default class useMobxStore {
  token: string | null = null
  userInfo = {}

  constructor() {
    // 响应式处理
    makeAutoObservable(this)
    // makePersistable 数据持久化存储
    makePersistable(this, {
      name: 'LenoAdmin_dev_1.0.0_token',
      properties: ['token'],
      storage: window.localStorage,
    })
    // makePersistable(this, {
    //   name: 'LenoAdmin_dev_1.0.0_userInfo',
    //   properties: ['userInfo'],
    //   storage: window.localStorage,
    // })
  }

  //#region 处理token
  // 存储token
  setToken = (token: string) => {
    this.token = token
  }
  //删除token
  removeToken = () => {
    this.token = null
  }
  // 存储 userinfo
  setUserInfo = (userInfo: IuserInfo) => {
    this.userInfo = userInfo
  }

  // 删除 userInfo
  removeUserInfo = () => {
    this.userInfo = {}
  }
  //#endregion
}
