// 用户列表
export interface DataType {
  userId: string | number
  userName: string | null
  nickName: string | null
  deptName: string | null
  phonenumber: string | null
  status: number | null
  createAt: string | null
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
  result: userType[]
}

// 用户信息
export interface userType {
  userId?: number
  deptid?: number | undefined
  userName?: string | undefined
  nickName?: string | undefined
  userType?: boolean | number | undefined
  email?: string | undefined
  phonenumber?: number | undefined
  sex?: boolean | number | undefined
  avatar?: string | undefined
  status?: boolean | number | undefined
  delFlag?: boolean | number | undefined
  loginIp?: string | undefined
  loginDate?: string | number | undefined
  createBy?: string | undefined
  updateBy?: string | undefined
  remark?: string | undefined
  iat?: string | undefined
  exp?: string | undefined
  createdAt?: string | undefined
  dept?: deptType | undefined
}

// 部门类型
export interface deptType {
  deptId: string | null
  parentId: string | null
  ancestors: string | null
  deptName: string | null
  orderNum: string | null
  leader: string | null
  phone: string | null
  email: string | null
  status: string | null
  delFlag: string | null
  createBy: string | null
  updateBy: string | null
  createdAt: string | null
  updatedAt: string | null
}
