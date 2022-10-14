import React, { useState } from 'react'
import classes from './index.module.scss'

/* 组件 */
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm'
import SvgIcon from '@/components/SvgIcon'
import { ILogin } from '@/type'

const Login = () => {
  // 控制 login 与 register 切换
  const [isLogin, setIsLogin] = useState(true)
  const [login, setLogin] = useState({
    user_name: 'admin',
    password: 123456,
  } as ILogin)

  const changeIsLogin = (data: ILogin) => {
    setLogin(data) // 将刚刚注册的账号复制给login为默认登录账号
    setIsLogin(!isLogin)
  }

  return (
    <div className={classes['login-container']}>
      <SvgIcon iconClass="login_bg" svgClass={classes['svg-bg']}></SvgIcon>
      <div className={classes['login-sencond-box']}>
        <div className={classes['left-img']}>
          <div className={classes['react-logo']}></div>
          <h1 className={classes['project-name']}>Leno-Admin</h1>
        </div>
        {/* login && Register */}
        <div className={classes['login-box']}>
          {isLogin ? (
            <LoginForm toggleLogin={isLogin} changeIsLogin={changeIsLogin} loginData={login} />
          ) : (
            <RegisterForm toggleLogin={isLogin} changeIsLogin={changeIsLogin} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
