import React, { useState } from 'react'
import { Form, Input, Select, Col, Row, Modal, Radio, TreeSelect } from 'antd'
import { userType, getAddUserResult } from '@/type'
import type { DataNode } from 'antd/es/tree'

export type UserFormValueType = Record<string, unknown> & Partial<userType>
export type AddEditFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void
  isModalOpen: boolean
  isAdd: boolean
  defaultData: DataNode[]
  postRole: getAddUserResult
}

const AddEditUser: React.FC<AddEditFormProps> = (props) => {
  const { Option } = Select
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { isModalOpen, isAdd, defaultData, postRole } = props
  // 添加用户 状态
  const [value, setValue] = useState(0)
  // 部门选择
  const [treeValue, setTreeValue] = useState<string>('')

  const onTreeChange = (newValue: string) => {
    setTreeValue(newValue)
  }
  const onPostChange = (newValue: string) => {
    setTreeValue(newValue)
  }
  console.log(28, postRole)

  const handleOk = () => {
    props.onCancel()
  }
  const handleCancel = () => {
    props.onCancel()
  }
  // 归属部门select
  const onAddGenderChange = (value: string) => {
    console.log(39, value)

    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' })
        return
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' })
        return
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' })
    }
  }
  // 修改状态
  const onRadioChange = () => {}

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title={isAdd ? '新增用户' : '编辑用户'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="用户昵称"
              name="userName"
              rules={[{ required: true, message: '请输入您的用户昵称!' }]}
            >
              <Input placeholder="请输入用户昵称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="归属部门" name="password">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={treeValue}
                fieldNames={{ value: 'key' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择归属部门"
                allowClear
                treeDefaultExpandAll
                onChange={onTreeChange}
                treeData={defaultData}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="手机号码" name="username">
              <Input placeholder="请输入手机号码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="邮箱" name="username">
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="用户名称"
              name="username"
              rules={[{ required: true, message: '请输入您的用户名称!' }]}
            >
              <Input placeholder="请输入用户名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="用户密码"
              name="username"
              rules={[{ required: true, message: '请输入您的用户密码!' }]}
            >
              <Input placeholder="请输入用户密码" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="用户性别" name="sex">
              <Select placeholder="请选择用户性别" onChange={onAddGenderChange} allowClear>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
                <Option value="other">未知</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="状态">
              <Radio.Group onChange={onRadioChange} value={value}>
                <Radio value={0}> 正常 </Radio>
                <Radio value={1}> 停用 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="岗位" name="post">
              <Select placeholder="请选择岗位" onChange={onPostChange} allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="角色" name="role">
              <Select placeholder="请选择角色" onChange={onAddGenderChange} allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item labelCol={{ span: 3 }} label="备注">
          <TextArea placeholder="请输入内容" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default AddEditUser
