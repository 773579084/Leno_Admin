import { http } from '../index'
import { IgetUserListAPI, ILimitAPI, IsucceeMes } from '@/type'

// 查询用户列表
export const getUserListAPI = (data: ILimitAPI) => {
  return http<IgetUserListAPI>('GET', '/system/user/list', data)
}

// 删除用户
export function delUserAPI(userId: number) {
  return http<IsucceeMes>('DELETE', '/system/user/' + userId)
}
