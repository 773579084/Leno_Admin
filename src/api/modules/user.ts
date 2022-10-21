import { http } from '../index'
import { ILoginApi, IRegisterApi, ILogin, IProfileAvatar, IGetUserInfoAPI } from '@/type'
import type { RcFile } from 'antd/es/upload/interface'

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
  return http<IGetUserInfoAPI>('GET', '/user/profile/userInfo')
}

// 头像上传
export const updateAvatarAPI = (data: any) => {
  return http<IProfileAvatar>('POST', '/user/profile/avatar', data)
}
