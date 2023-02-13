import { http } from '../index'
import {
  IgetUserListAPI,
  ILimitAPI,
  IsucceeMes,
  IdeptTreeAPI,
  IgetAddUserAPI,
  userType,
  IgetPostRoleApi,
  IreturnApi,
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
// 岗位及角色数据获取
export const getPostRoleAPI = () => {
  return http<IgetPostRoleApi>('GET', '/system/user')
}
// 新增用户
export const addUserAPI = (data: userType) => {
  return http<IgetAddUserAPI>('POST', '/system/user', data)
}

// 修改用户密码信息
export const patchUserPwdAPI = (data: userType) => {
  return http<IreturnApi>('PATCH', '/system/user/updatePwd', data)
}

// 获取用户个人详细数据
export const getUserInfoAPI = (userId: number) => {
  return http<IgetAddUserAPI>('GET', '/system/userInfo/' + userId)
}

// 修改用户信息
export const patchUserAPI = (data: userType) => {
  return http<IgetAddUserAPI>('PATCH', '/system/user', data)
}
