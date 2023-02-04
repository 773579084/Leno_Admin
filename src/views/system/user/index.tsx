import React, { useMemo, useState, useEffect } from 'react'
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
  Tree,
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
import type { DataNode } from 'antd/es/tree'
import type { RangePickerProps } from 'antd/es/date-picker'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { getUserListAPI, delUserAPI, deptTreeAPI, getAddUserAPI } from '@/api/modules/sys_user'
import classes from './index.module.scss'
import AddEditUser from './component/AddEditUser'
import { DataType, userType, getAddUserResult } from '@/type'
const { RangePicker } = DatePicker

const dataList: { key: React.Key; title: string }[] = []

const User: React.FC = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const { Search } = Input
  // 分页
  const [queryParams, setQueryParams] = useState({ pageNum: 1, pageSize: 10 })
  // 用户列表数据
  const [userList, setUserList] = useState({ count: 0, rows: [] as userType[] })
  // 消息提示 message
  const [messageApi, contextHolder] = message.useMessage()
  // model显隐
  const [isModalOpen, setIsModalOpen] = useState(false)
  // true：新增 false：编辑
  const [isAdd, setIsAdd] = useState(true)
  // add btn
  const [postRole, setPostRole] = useState() as any

  // left deptTree
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  // 搜索值
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  // tree data
  const [defaultData, setdefaultData] = useState<DataNode[]>([])

  // create
  useEffect(() => {
    getUserList()
    generateData()
  }, [])

  // left deptTree
  // 生成树状数据
  const generateData = async () => {
    const { data } = await deptTreeAPI()
    setdefaultData([...data.result])
  }

  // 监听部门数据源结构，改变则重新生成搜索用的扁平数据结构
  useEffect(() => {
    dataList.splice(0)
    generateList(defaultData)
  }, [defaultData])

  // 生成搜索用的扁平数据结构
  const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key, title } = node
      dataList.push({ key, title: title as string })
      if (node.children) {
        generateList(node.children)
      }
    }
  }

  const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey!
  }

  // 展开
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  // search输入后触发
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    setExpandedKeys(newExpandedKeys as React.Key[])
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className={classes['site-tree-search-value']}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          )
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) }
        }

        return {
          title,
          key: item.key,
        }
      })

    return loop(defaultData)
  }, [searchValue, defaultData])

  //#region 头部搜索
  // 查询用户列表
  const getUserList = async () => {
    const { data } = await getUserListAPI(queryParams)
    setUserList({ ...data.result })
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
  // table 首列按钮
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
          <Button
            onClick={() => {
              setIsModalOpen(true)
              setIsAdd(false)
            }}
            size="small"
            icon={<EditOutlined />}
            type="link"
          >
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

  // btn 功能
  const getPostRoleFn = async () => {
    const res = await getAddUserAPI()
    setPostRole(res.data.result)
  }

  return (
    <Row gutter={16} className={classes['sys-user']}>
      {contextHolder}
      <Col span={4}>
        <Search style={{ marginBottom: 8 }} placeholder="请输入部门名称" onChange={onChange} />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
        />
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
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setIsModalOpen(true)
                    getPostRoleFn()
                  }}
                >
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
            current={queryParams.pageNum}
            showTotal={(total) => `共 ${total} 条`}
          />
        </div>
        {/* 添加 编辑 用户 */}
        <AddEditUser
          isModalOpen={isModalOpen}
          isAdd={isAdd}
          defaultData={defaultData}
          postRole={postRole}
          onCancel={() => {
            setIsModalOpen(false)
          }}
        />
      </Col>
    </Row>
  )
}

export default User
