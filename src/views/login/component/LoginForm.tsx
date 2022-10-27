import React from 'react'
import { useNavigate } from 'react-router-dom'
/* ant */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, message, Input } from 'antd'
import { loginAPI } from '@/api/modules/user'
import { ILogin } from '@/type'
// mobx
import classes from '../index.module.scss'
// cookie
import { setToken, setRefreshToken } from '@/utils'

const LoginForm = (props: any) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // props
  const { loginData, changeIsLogin } = props

  //#region  login
  const onFinish = async (data: ILogin) => {
    try {
      const res = await loginAPI(data)
      setToken(res.data.result?.token as string)
      setRefreshToken(res.data.result?.refreshToken as string)
      message.success('登录成功！')
      navigate('/')
    } catch (error) {}
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //#endregion

  return (
    <Form
      form={form}
      name="normal_login"
      className={classes['login-form']}
      initialValues={{
        user_name: loginData.user_name,
        password: loginData.password,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className={classes['title-container']}>
        <h3 className={classes['title']}>Login</h3>
      </div>
      <Form.Item
        name="user_name"
        rules={[
          {
            min: 4,
            max: 11,
            required: true,
            message: '请输入4~11位只包含数字字母的账号!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号:admin" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            pattern: new RegExp('^.{4,11}$'),
            required: true,
            message: '请输入4~11位密码!',
          },
        ]} // 此处password如果使用min，max正则，则初始值无法被检测到，换成pattern则无问题
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码:123456"
        />
      </Form.Item>

      <Form.Item>
        <Button
          className={`login-form-button ${classes['login-btn']}`}
          onClick={() => form.resetFields()}
        >
          重置
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={`login-form-button ${classes['login-btn']}`}
        >
          登录
        </Button>
        <div style={{ flex: 1 }}>
          <a onClick={() => changeIsLogin()} style={{ float: 'right' }}>
            去注册
          </a>
        </div>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
