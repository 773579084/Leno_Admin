import { http } from '../index'
import { IgetUserListAPI, ILimitAPI, IsucceeMes, IdeptTreeAPI } from '@/type'

// 查询用户列表
export const getUserListAPI = (data: ILimitAPI) => {
  return http<IgetUserListAPI>('GET', '/system/user/list', data)
}

// 删除用户
export function delUserAPI(userId: number) {
  return http<IsucceeMes>('DELETE', '/system/user/' + userId)
}

// 查询部门下拉树结构
export const deptTreeAPI = () => {
  return http<IdeptTreeAPI>('GET', '/system/dept/treeselect')
}

// 新增用户
export const addUserAPI = (data: any) => {
  return http<IdeptTreeAPI>('POST', '/system/user', data)
}
