import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, DatePicker, Col, Row, Tooltip, Table, Switch } from 'antd'
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
import { getUserListAPI } from '@/api/modules/sys_user'

const { Option } = Select
const { RangePicker } = DatePicker

// type
import { DataType, userType } from '@/type'

const User = () => {
  const [form] = Form.useForm()
  // 分页
  const [queryParams, setQueryParams] = useState({ pageNum: 1, pageSize: 10 })
  // 用户列表数据
  const [userList, setUserList] = useState() as any

  // create
  useEffect(() => {
    getUserList()
  }, [])

  // 查询用户列表
  const getUserList = async () => {
    const { data } = await getUserListAPI(queryParams)
    console.log(30, data)
    setUserList(data.result)
  }

  //form input
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onGenderChange = (value: string) => {
    console.log(16, value)
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day')
  }

  // 搜索

  // table
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')

  // status btn
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  // 删除user
  const delUserFn = (record: userType) => {
    console.log(74, record)
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
          <Switch checked={!record.status} onChange={onChange} />
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
  const data: DataType[] = userList

  return (
    <Row gutter={16}>
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
                <Button icon={<PlusOutlined />}>新增</Button>
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
            rowKey="userId"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Col>
    </Row>
  )
}

export default User
