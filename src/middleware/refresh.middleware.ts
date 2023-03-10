import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import env from '../config/config.default'
import errors from '../constants/err.type'
import dayjs from 'dayjs'
const { invalidRefreshToken } = errors

const refreshAuth = async (ctx: Context, next: () => Promise<void>) => {
  const { authorization = '' } = ctx.request.header
  const refreshToken = authorization.replace('Bearer ', '')

  try {
    const user = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET)
    if (dayjs().isAfter(user.exp)) {
      console.error('refreshToken 过期')
      return ctx.app.emit('error', invalidRefreshToken, ctx)
    }
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      default:
        console.error('无效的refreshToken', error)
        return ctx.app.emit('error', invalidRefreshToken, ctx)
    }
  }

  await next()
}

export default refreshAuth
