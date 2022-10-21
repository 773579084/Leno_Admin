import React from 'react'
import { Button, Form, Input, Space } from 'antd'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}
const tailLayout = {
  wrapperCol: { offset: 3, span: 21 },
}

const Basics = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onClose = () => {
    form.resetFields()
  }

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="oldPwd" label="旧密码" rules={[{ required: true }]}>
        <Input placeholder="请输入旧密码" />
      </Form.Item>
      <Form.Item name="newPwd" label="新密码" rules={[{ required: true }]}>
        <Input placeholder="请输入新密码" />
      </Form.Item>
      <Form.Item name="confirmPwd" label="确认密码" rules={[{ required: true }]}>
        <Input placeholder="请输入新密码" />
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
