import { http } from '../index'
import { ILoginApi, IRegisterApi, ILogin } from '@/type'

// 登录
export const loginAPI = (data: ILogin) => {
  return http<ILoginApi>('POST', '/user/login', data)
}

// 注册
export const registerAPI = (data: ILogin) => {
  return http<IRegisterApi>('POST', '/user/register', data)
}

// 获取用户信息
export const getUserAPI = () => {
  return http('GET', '/user/profile/userInfo')
}
