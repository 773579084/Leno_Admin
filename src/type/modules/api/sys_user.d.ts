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
  user_id?: number
  dept_id?: number
  user_name?: string
  nick_name?: string
  user_type?: boolean | number
  email?: string
  phonenumber?: number
  sex?: boolean | number
  avatar?: string
  password?: string
  status?: boolean | number
  del_flag?: boolean | number
  login_ip?: string
  login_date?: string | number
  create_by?: string
  update_by?: string
  remark?: string
  iat?: string
  exp?: string
  createdAt?: string | null
  updatedAt?: string | null
  dept?: deptType
}

// 部门类型
export interface deptType {
  dept_id: string | null
  parent_id: string | null
  ancestors: string | null
  dept_name: string | null
  order_num: string | null
  leader: string | null
  phone: string | null
  email: string | null
  status: string | null
  del_flag: string | null
  create_by: string | null
  update_by: string | null
  createdAt: string | null
  updatedAt: string | null
}
