import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Col,
  Row,
  Tooltip,
  Table,
  Switch,
  message,
  Pagination,
  Modal,
  Radio,
} from 'antd'
import {
  SyncOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  ToTopOutlined,
  AppstoreFilled,
  DoubleRightOutlined,
} from '@ant-design/icons'
import type { RangePickerProps } from 'antd/es/date-picker'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { getUserListAPI, delUserAPI } from '@/api/modules/sys_user'
import classes from './index.module.scss'

const { Option } = Select
const { RangePicker } = DatePicker
// type
import { DataType, userType } from '@/type'

const User: React.FC = () => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  // 分页
  const [queryParams, setQueryParams] = useState({ pageNum: 1, pageSize: 10 })
  // 用户列表数据
  const [userList, setUserList] = useState({ count: 0, rows: [] as userType[] })
  // 消息提示 message
  const [messageApi, contextHolder] = message.useMessage()
  // 显隐 添加 编辑 用户
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTitle, setisTitle] = useState('添加用户')
  // 添加用户 状态
  const [value, setValue] = useState(0)

  // create
  useEffect(() => {
    getUserList()
  }, [])

  //#region 头部搜索
  // 查询用户列表
  const getUserList = async () => {
    const { data } = await getUserListAPI(queryParams)
    setUserList(data.result)
    console.log(57, data)
  }

  //搜索栏搜索
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  // 搜索栏报错
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 搜索用户状态select
  const onGenderChange = (value: string) => {
    console.log(16, value)
  }

  // 时间搜索
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day')
  }
  //#endregion

  //#region table
  // table 前列按钮
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')

  // 分页
  const onPagChange = async (pageNum: number, pageSize: number) => {
    setQueryParams({ pageNum, pageSize })
  }
  useEffect(() => {
    getUserList()
  }, [queryParams])

  // 用户状态修改
  const onUserStaChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  // 删除user
  const delUserFn = async (record: userType) => {
    const { data } = await delUserAPI(record.userId as number)
    messageApi.open({
      type: 'success',
      content: data.message,
    })
    getUserList()
  }

  // table columns
  const columns: ColumnsType<DataType> = [
    {
      title: '用户编号',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userId',
      align: 'center',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'userId',
      align: 'center',
    },
    {
      title: '区域',
      dataIndex: ['dept', 'deptName'],
      key: 'userId',
      align: 'center',
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
      key: 'userId',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'userId',
      align: 'center',
      render: (_, record) => (
        <div>
          <Switch checked={!record.status} onChange={onUserStaChange} />
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'userId',
      align: 'center',
    },
    {
      title: '操作',
      key: 'userId',
      align: 'center',
      render: (record) => (
        <div>
          <Button size="small" icon={<EditOutlined />} type="link">
            修改
          </Button>
          <Button
            size="small"
            onClick={() => delUserFn(record)}
            icon={<DeleteOutlined />}
            type="link"
          >
            删除
          </Button>
          <Button size="small" icon={<DoubleRightOutlined />} type="link">
            更多
          </Button>
        </div>
      ),
    },
  ]
  // table 数据源
  const data: any = userList.rows
  //#endregion

  //#region 添加 编辑 用户
  // model 显隐控制
  const showModal = () => {
    setIsModalOpen(true)
    console.log(192, isModalOpen)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // 归属部门select
  const onAddGenderChange = (value: string) => {
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
  //#endregion

  return (
    <Row gutter={16} className={classes['sys-user']}>
      {contextHolder}
      <Col span={4}>
        <Input placeholder="请输入用户名称" prefix={<SearchOutlined />} allowClear />
        <div>公司部门</div>
      </Col>
      <Col span={20}>
        <Form
          name="basic"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="leno-search"
        >
          <Form.Item label="用户名称" name="roleName">
            <Input style={{ width: 240 }} placeholder="请输入用户名称" allowClear />
          </Form.Item>
          <Form.Item label="手机号码" name="preCharacter">
            <Input style={{ width: 240 }} placeholder="请输入手机号码" allowClear />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select
              style={{ width: 240 }}
              placeholder="用户状态"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">正常</Option>
              <Option value="female">停用</Option>
            </Select>
          </Form.Item>
          <Form.Item label="创建时间" name="preCharacter">
            <RangePicker style={{ width: 240 }} disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<SyncOutlined />}>重置</Button>
          </Form.Item>
        </Form>
        <Row gutter={16} className="mb10">
          <Col span={16} className="leno-btn">
            <Row gutter={8}>
              <Col className="add-btn">
                <Button icon={<PlusOutlined />} onClick={showModal}>
                  新增
                </Button>
              </Col>
              <Col className="change-btn">
                <Button icon={<EditOutlined />}>修改</Button>
              </Col>
              <Col className="del-btn">
                <Button danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Col>
              <Col className="import-btn">
                <Button icon={<ToTopOutlined />}>导入</Button>
              </Col>
              <Col className="export-btn">
                <Button icon={<VerticalAlignBottomOutlined />}>导出</Button>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={8} justify="end">
              <Col>
                <Tooltip placement="top" title="隐藏搜索">
                  <Button shape="circle" icon={<SearchOutlined />} />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="刷新">
                  <Button shape="circle" icon={<SyncOutlined />} />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="显隐列">
                  <Button shape="circle" icon={<AppstoreFilled />} />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="leno-table">
          <Table
            rowSelection={{ type: selectionType }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="userId"
          />
          <Pagination
            className={classes['pagination']}
            onChange={onPagChange}
            total={userList.count}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条`}
          />
        </div>
        {/* 添加 编辑 用户 */}
        <Modal
          title={isTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
        >
          <Form
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
                  name="username"
                  rules={[{ required: true, message: '请输入您的用户昵称!' }]}
                >
                  <Input placeholder="请输入用户昵称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="归属部门" name="password">
                  <Select placeholder="请选择归属部门" onChange={onAddGenderChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
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
                <Form.Item label="用户性别" name="password">
                  <Select placeholder="请选择用户性别" onChange={onAddGenderChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
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
                <Form.Item label="岗位" name="password">
                  <Select placeholder="请选择岗位" onChange={onAddGenderChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色" name="password">
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
      </Col>
    </Row>
  )
}

export default User
