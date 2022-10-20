export function baseUrlFn(NODE_ENV: string) {
  if (NODE_ENV === 'development') {
    return 'http://127.0.0.1:3010' // leno_server
  } else if (NODE_ENV === 'test') {
    return 'https://mock.apifox.cn/m1/1279603-0-default'
  } else if (NODE_ENV === 'production') {
    return 'https://mock.apifox.cn/m1/1279603-0-default'
  } else {
    return 'http://127.0.0.1:3010'
  }
}
