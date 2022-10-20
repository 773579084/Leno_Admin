import React, { useEffect } from 'react'
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
  const { changeIsLogin, registerList } = props

  //#region  register
  const onFinish = async (data: ILogin) => {
    // 判断第一次密码 是否和 第二次 相同
    if (data.password !== data.password2) {
      message.warning('两次密码不相同！')
      form.resetFields()
      return
    }

    try {
      const res = await registerAPI({ user_name: data.user_name, password: data.password })
      message.success(res.data.message)
      changeIsLogin({ user_name: data.user_name, password: data.password }, 'regOk')
      // 注册成功后清空 registerList 的值
      changeIsLogin({ user_name: '', password: '', password2: '' }, 'reg')
    } catch (error) {
      // 注册失败后清空 registerList 的值
      changeIsLogin({ user_name: '', password: '', password2: '' }, 'regErr')
      form.resetFields()
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //#endregion

  const changeIsLoginFn = () => {
    const completeRegisterList = form.getFieldsValue()
    changeIsLogin(completeRegisterList, 'reg')
  }

  return (
    <Form
      form={form}
      name="normal_login"
      className={classes['login-form']}
      initialValues={{
        user_name: registerList.user_name,
        password: registerList.password,
        password2: registerList.password2,
      }}
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
            message: '请输入4~11位只包含数字字母的账号!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="账号: 请输入4~11位只包含数字字母的账号"
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
          <a onClick={() => changeIsLoginFn()} style={{ float: 'right' }}>
            去登录
          </a>
        </div>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
