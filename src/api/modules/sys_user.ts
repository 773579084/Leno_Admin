import { http } from '../index'
import { IgetUserListAPI, ILimitAPI } from '@/type'

// 查询用户列表
export const getUserListAPI = (data: ILimitAPI) => {
  return http<IgetUserListAPI>('GET', '/system/user/list', data)
}
