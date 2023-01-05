import { http } from '../index'
import {
  ILoginApi,
  IRegisterApi,
  ILogin,
  IProfileAvatar,
  IGetUserInfoAPI,
  IChangePwd,
  IsucceeMes,
  IUserProp,
} from '@/type'

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
export const updateAvatarAPI = (data: FormData) => {
  return http<IProfileAvatar>('POST', '/user/profile/avatar', data)
}

// 修改密码
export const updatePwdAPI = (data: IChangePwd) => {
  return http<IsucceeMes>('patch', '/user/profile/updatePwd', data)
}

// 修改个人基本信息
export const updateUserInfoAPI = (data: IUserProp) => {
  return http<IsucceeMes>('patch', '/user/profile', data)
}
