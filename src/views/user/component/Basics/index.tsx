import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, Space } from 'antd'
import { IUserProp } from '@/type'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}
const tailLayout = {
  wrapperCol: { offset: 3, span: 21 },
}

const Basics = (props: any) => {
  const [form] = Form.useForm()
  const [userInfo, setUserInfo] = useState({
    ...props.userInfoData,
  })

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onClose = () => {
    form.resetFields()
  }

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{
        nickName: userInfo.nickName,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
      }}
    >
      <Form.Item name="nickName" label="用户昵称" rules={[{ required: true }]}>
        <Input placeholder="请输入1~10字昵称" />
      </Form.Item>
      <Form.Item name="phoneNumber" label="手机号码" rules={[{ required: true }]}>
        <Input placeholder="请输入手机号码" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="sex" label="性别">
        <Radio.Group value={userInfo.sex ? 1 : 0}>
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
export default Basics
