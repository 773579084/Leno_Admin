// 登录form
export interface ILogin {
  user_name: string | number
  password: string | number
  password2?: string | number
}

// 登录成功后返回值
export interface IuserInfo {
  name: string
  age: number
}

//#region  login && registerAPI 接口返回值
export interface ILoginApi {
  status: number
  token?: string
  message?: string
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

//#endregion
