// 登录form
export interface ILogin {
  user_name?: string
  password?: string
  password2?: string
}

// propstype
export interface userPropsType {
  toggleLogin?: boolean
  changeIsLogin?: function
}

//#region  login && registerAPI 接口返回值
export interface ILoginApi {
  code?: number
  message?: string
  result?: ILoginResult
}
export interface ILoginResult {
  token: string
}

export interface IRegisterApi {
  code: number
  message: string
  result: registerResult
}
export interface registerResult {
  id: number
  user_name: string
}

// 返回的个人信息
export interface IuserInfo {
  id?: number
  dept_id?: number
  user_name?: string
  nick_name?: string
  user_type?: boolean | number
  email?: string
  phonenumber?: number
  sex?: boolean | number
  avatar?: string
  status?: boolean | number
  del_flag?: boolean | number
  login_ip?: string
  login_date?: string | number
  create_by?: string
  update_by?: string
  remark?: string
  iat?: string
  exp?: string
}

//#endregion
