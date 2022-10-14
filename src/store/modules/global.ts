import { makeAutoObservable } from 'mobx'

export default class useGlobalStore {
  isLoading: boolean = false // 控制全局loading效果
  globalLoadingTimeMobx: number = 0 // 控制全局loading显示时间

  constructor() {
    makeAutoObservable(this)
  }

  // change Loading
  changeIsLoading = (bol: boolean, num?: number) => {
    this.isLoading = bol
    num ? (this.globalLoadingTimeMobx = num) : null
  }
}
