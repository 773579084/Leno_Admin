import React from 'react'
/* ant */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, message, Input } from 'antd'
import { registerAPI } from '@/api/modules/user'
import { ILogin } from '@/type'
// mobx
import classes from '../index.module.scss'

const RegisterForm = (props: any) => {
  const [form] = Form.useForm()

  // props
  const { changeIsLogin } = props

  //#region  register
  const onFinish = async (data: ILogin) => {
    // 判断第一次密码 是否和 第二次 相同
    if (data.password !== data.password2) {
      message.warning('两次密码不相同！')
      form.resetFields()
      return
    }

    const res = await registerAPI({ user_name: data.user_name, password: data.password })

    if (res && res.data.code === 0) {
      message.success(res.data.message)
      changeIsLogin({ user_name: data.user_name, password: data.password })
    } else {
      res && message.error(res.data.message)
    }
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className={classes['title-container']}>
        <h3 className={classes['title']}>Register</h3>
      </div>
      <Form.Item
        name="user_name"
        rules={[
          {
            min: 4,
            max: 11,
            required: true,
            message: '请输入4~11位账号!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="账号: 请输入4~11位"
        />
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
          placeholder="密码: 请输入4~11位"
        />
      </Form.Item>
      <Form.Item
        name="password2"
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
          placeholder="确认密码"
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
          注册
        </Button>
        <div style={{ flex: 1 }}>
          <a onClick={() => changeIsLogin()} style={{ float: 'right' }}>
            去登录
          </a>
        </div>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
