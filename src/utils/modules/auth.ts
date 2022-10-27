import Cookies from 'js-cookie'

const TokenKey = 'leno_admin_token'
const RefreshokenKey = 'leno_admin_refreshtoken'

/* Token */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/* refreshToken */
export function getRefreshToken() {
  return Cookies.get(RefreshokenKey)
}

export function setRefreshToken(refreshToken: string) {
  return Cookies.set(RefreshokenKey, refreshToken)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshokenKey)
}
