import axios, { type Method } from 'axios'
import NProgress from './nprogress'
import useStore from '@/store'
import { baseUrlFn } from '@/utils'
import { message } from 'antd'

// control global serve loading
const {
  useGlobalStore: { changeIsLoading },
  useUserStore,
} = useStore()

// 请求基地址
export const baseURL = baseUrlFn(process.env.BASE_ENV)

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 又token配置请求头
    if (useUserStore.token && config.headers) {
      config.headers.Authorization = 'Bearer ' + useUserStore.token
    }
    changeIsLoading(true)
    NProgress.start()
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    setTimeout(() => {
      changeIsLoading(false)
    }, 300)

    NProgress.done()
    return response
  },
  function (error) {
    NProgress.done()
    changeIsLoading(false)
    // 对响应错误做点什么
    if (!error.response) {
      // 网络错误，response 没有信息
      window.location.pathname = '/500'
    } else {
      // 对响应错误做点什么 400 401 404 500 ...
      // 通用错误，通用提示
      message.error(error.response.data.code + ' ' + error.response.data.message)
    }
    return
  },
)

// 后端返回的接口数据格式
export interface ResponseData<T> {
  status: number
  data: T
}

/**
 * axios 二次封装
 * @param {String} url  请求地址
 * @param {String} method  请求类型
 * @param {Object} submitData  对象类型，提交数据
 */
export const http = <T>(method: Method, url: string, submitData?: unknown) => {
  return instance.request<T, ResponseData<T>>({
    url,
    method,
    // 自动设置合适的 params/data 键名称，如果 method 为 get 用 params 传请求参数，否则用 data
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
  })
}

export default instance
