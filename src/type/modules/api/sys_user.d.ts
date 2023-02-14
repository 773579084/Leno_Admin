import { number } from 'echarts'

// 用户列表
export interface DataType {
  userId: number
  userName: string
  nickName: string
  deptName: string
  phonenumber: string
  status: number
  createAt: string
}

// 查询页数
export interface ILimitAPI {
  pageNum: number
  pageSize: number
}

// 查询用户列表
export interface IgetUserListAPI {
  code: number
  message: string
  result: {
    count: number
    rows: userType[]
  }
}

// 查询部门下拉树结构
export interface Children {
  key: number
  title: string
}

export interface Children {
  key: number
  title: string
  children: Children[]
}

export interface Result {
  key: number
  title: string
  children: Children[]
}

export interface IdeptTreeAPI {
  code: number
  message: string
  result: Result[]
}

export interface userType {
  userId?: number
  deptId?: number
  userName?: string
  nickName?: string
  userType?: number
  email?: string
  phonenumber?: string
  sex?: number
  avatar?: string
  status?: number
  delFlag?: number
  loginIp?: string
  loginDate?: string
  createBy?: string
  updateBy?: string
  remark?: string
  iat?: string
  exp?: string
  createdAt?: string
  dept?: deptType
  password?: string
  postIds?: number[]
  roleIds?: number[]
  posts?: Post[]
  roles?: Role[]
}

export interface deptType {
  deptId: number
  parentId: number
  deptName: string
  orderNum: number
  leader: string
  phone: string
  email: string
  status: string
  delFlag: string
  createBy: string
  updateBy: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  status: string
  remark?: any
  createdAt: string
  updatedAt: string
  postId: number
  postCode: string
  postName: string
  postSort: number
  delFlag: string
  createBy: string
  updateBy?: any
}

export interface Role {
  status: string
  remark: string
  createdAt: string
  updatedAt: string
  roleId: number
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  menuCheckStrictly: number
  deptCheckStrictly: number
  delFlag: string
  createBy: string
  updateBy?: any
}

export interface getAddUserResult {
  posts: Post[]
  roles: Role[]
}

export interface IgetPostRoleApi {
  code: number
  message: string
  result: getAddUserResult
}

export interface IgetAddUserAPI {
  code: number
  message: string
  result: userType
}

// 无参数返回
export interface IreturnApi {
  code: number
  message: string
  result: ''
}
