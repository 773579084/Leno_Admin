import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Radio, Space } from 'antd'
import { updateUserInfoAPI, getUserAPI } from '@/api/modules/user'
import { useNavigate, useLocation } from 'react-router-dom'
import { IUserProp } from '@/type'
import useStore from '@/store'
import { observer } from 'mobx-react-lite'
import { HOME_URL } from '@/config/config'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}
const tailLayout = {
  wrapperCol: { offset: 3, span: 21 },
}

const Basics = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {
    useUserStore: { userInfo, setUserInfo },
    useLayoutStore: { defaultObjMobx, changeTabsListMobx },
  } = useStore()
  const [user, setUser] = useState({
    nickName: userInfo.nickName,
    phoneNumber: userInfo.phonenumber,
    email: userInfo.email,
    sex: userInfo.sex,
  })

  const onFinish = async (values: IUserProp) => {
    try {
      const res = await updateUserInfoAPI(values)
      message.success(res.data.message)
      // 更新 userInfo 的信息
      const userRes = await getUserAPI()
      setUserInfo(userRes.data.result)
    } catch (error) {}
  }

  const onClose = () => {
    const newTabs = defaultObjMobx.tabsListMobx.filter((item) => item.path !== pathname)
    changeTabsListMobx(newTabs)
    navigate(HOME_URL)
  }

  return (
    <Form
      {...layout}
      form={form}
      name="control-user"
      onFinish={onFinish}
      initialValues={{
        nickName: user.nickName,
        phonenumber: user.phoneNumber,
        email: user.email,
        sex: userInfo.sex ? 1 : 0,
      }}
    >
      <Form.Item
        name="nickName"
        label="用户昵称"
        rules={[
          {
            min: 1,
            max: 10,
            required: true,
            message: '请输入1~10字昵称!',
          },
        ]}
      >
        <Input placeholder="请输入1~10字昵称" />
      </Form.Item>
      <Form.Item
        name="phonenumber"
        label="手机号码"
        rules={[{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号码！' }]}
      >
        <Input placeholder="请输入手机号码" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: '请输入正确的邮箱号！',
          },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="sex" label="性别">
        <Radio.Group name="sex">
          <Radio value={0}> 男 </Radio>
          <Radio value={1}> 女 </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" danger onClick={onClose}>
            关闭
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
export default observer(Basics)
