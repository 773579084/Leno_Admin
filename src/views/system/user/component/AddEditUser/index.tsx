import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Col, Row, Modal, Radio, TreeSelect, message } from 'antd'
import { userType, getAddUserResult } from '@/type'
import type { DataNode } from 'antd/es/tree'
import { addUserAPI } from '@/api/modules/sys_user'

export type UserFormValueType = Record<string, unknown> & Partial<userType>
export type AddEditFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void
  onSubmit: () => void
  isModalOpen: boolean
  isAdd: boolean
  defaultData: DataNode[]
  postRole: getAddUserResult
  propsValues: userType
}

const AddEditUser: React.FC<AddEditFormProps> = (props) => {
  const { Option } = Select
  const { TextArea } = Input
  const [form] = Form.useForm()
  const { isModalOpen, isAdd, defaultData, postRole, propsValues } = props

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({
      nickName: propsValues.nickName,
      deptId: propsValues.deptId,
      phonenumber: propsValues.phonenumber,
      email: propsValues.email,
      userName: propsValues.userName,
      password: propsValues.password,
      sex: propsValues.sex,
      status: propsValues.status,
      postIds: propsValues.postIds,
      roleIds: propsValues.roleIds,
      remark: propsValues.remark,
    })
  }, [form, props])

  // modal 弹框
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    props.onCancel()
    form.resetFields()
  }

  const onFinish = async (values: userType) => {
    try {
      const res = await addUserAPI(values)
      message.success(res.data.message)
      props.onSubmit()
    } catch (error) {}
    props.onCancel()
  }

  return (
    <Modal
      title={isAdd ? '新增用户' : '编辑用户'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
      forceRender
    >
      <Form form={form} labelCol={{ span: 6 }} initialValues={propsValues} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="用户昵称"
              name="nickName"
              rules={[{ required: true, min: 4, max: 11, message: '请输入4-11位用户昵称!' }]}
            >
              <Input placeholder="请输入4-11位用户昵称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="归属部门" name="deptId">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                fieldNames={{ value: 'key' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择归属部门"
                allowClear
                treeDefaultExpandAll
                treeData={defaultData}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="手机号码"
              name="phonenumber"
              rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }]}
            >
              <Input placeholder="请输入手机号码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  pattern:
                    /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
                  message: '请输入正确的邮箱!',
                },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="用户名称"
              name="userName"
              rules={[{ required: true, min: 4, max: 11, message: '请输入4-11位用户名称!' }]}
            >
              <Input placeholder="请输入4-11位用户名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="用户密码"
              name="password"
              rules={[{ required: true, min: 4, max: 11, message: '请输入4-11位密码!' }]}
            >
              <Input.Password placeholder="请输入4-11位密码" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="用户性别" name="sex">
              <Select placeholder="请选择用户性别" allowClear>
                <Option value={0}>男</Option>
                <Option value={1}>女</Option>
                <Option value={2}>未知</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value={0}> 正常 </Radio>
                <Radio value={1}> 停用 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="岗位" name="postIds">
              <Select
                mode="multiple"
                allowClear
                fieldNames={{ label: 'postName', value: 'postId' }}
                style={{ width: '100%' }}
                placeholder="请选择岗位"
                options={postRole.posts}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="角色" name="roleIds">
              <Select
                mode="multiple"
                allowClear
                fieldNames={{ label: 'roleName', value: 'roleId' }}
                style={{ width: '100%' }}
                placeholder="请选择角色"
                options={postRole.roles}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 3 }}
          label="备注"
          name="remark"
          rules={[{ max: 200, message: '请输入备注(200字以内)!' }]}
        >
          <TextArea showCount placeholder="请输入备注(200字以内)" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default AddEditUser
