import instance from './index'
import { getRefreshToken, setToken } from '@/utils'

let lock = true // 锁
const originRequest: any = [] // 缓冲

/**
 * 处理401——刷新token并处理之前的请求，目的在于实现用户无感知刷新
 * @param config 之前的请求的配置
 * @returns {Promise<unknown>}
 */
export default async function async(config: any) {
  if (lock) {
    lock = false
    try {
      const res = await refreshTokenAPI(getRefreshToken() as string)
      const token = res.data.result.token
      setToken(token)
      originRequest.map((callback: Function) => callback(token))
      originRequest.splice(0)
    } catch (error) {}
  }
  lock = true
  // 关键代码，返回Promise替换当前的请求
  return new Promise((resolve) => {
    // 收集旧的请求，以便刷新后构造新的请求，同时由于Promise链式调用的效果，
    // instance(config)的结果就是最终的请求结果
    originRequest.push(() => {
      resolve(instance(config))
    })
  })
}

// 重新获取 Token
export const refreshTokenAPI = (refreshToken: string) => {
  return instance.get('/user/refresh', {
    headers: {
      authorization: 'Bearer ' + refreshToken,
    },
  })
}
