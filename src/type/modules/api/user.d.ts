// 登录form
export interface ILogin {
  userName?: string
  password?: string
  password2?: string
}

// propstype
export interface userPropsType {
  toggleLogin?: boolean
  changeIsLogin?: function
}

// userInfo
export interface IChangePwd {
  confirmPwd?: string
  newPwd?: string
  oldPwd?: string
}

//#region  login && registerAPI 接口返回值
export interface ILoginApi {
  code?: number
  message?: string
  result?: ILoginResult
}
export interface ILoginResult {
  token?: string
  refreshToken?: string
}

export interface IRegisterApi {
  code: number
  message: string
  result: registerResult
}
export interface registerResult {
  userId: number
  userName: string
}

export interface IProfileAvatar {
  code: number
  message: string
  result: { avatarImg: string }
}

// 成功消息提醒
export interface IsucceeMes {
  code: number
  message: string
  result?: null
}

// 返回的个人信息
export interface IuserInfo {
  userId?: number
  deptId?: number
  userName?: string
  nickName?: string
  userType?: boolean | number
  email?: string
  phonenumber?: number
  sex?: boolean | number
  avatar?: string
  status?: boolean | number
  delFlag?: boolean | number
  loginIp?: string
  loginDate?: string | number
  createBy?: string
  updateBy?: string
  remark?: string
  iat?: string
  exp?: string
  createdAt?: string
}

export interface IGetUserInfoAPI {
  code: number
  message: string
  result: IuserInfo
}

//#endregion

// props
export interface IUserProp {
  nickName?: string
  phoneNumber?: string
  email?: string
  sex?: number
}
