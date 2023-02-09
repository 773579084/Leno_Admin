import { http } from '../index'
import {
  IgetUserListAPI,
  ILimitAPI,
  IsucceeMes,
  IdeptTreeAPI,
  IgetAddUserAPI,
  userType,
} from '@/type'

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

// 新增用户弹窗内岗位及角色数据获取
export const getAddUserAPI = (data: userType | null) => {
  return http<IgetAddUserAPI>('POST', '/system/user', data)
}
