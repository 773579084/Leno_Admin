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
  Popconfirm,
  Popover,
  Modal,
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
  CheckCircleOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import type { ColumnsType } from 'antd/es/table'
import {
  getUserListAPI,
  delUserAPI,
  deptTreeAPI,
  getPostRoleAPI,
  patchUserPwdAPI,
  getUserInfoAPI,
} from '@/api/modules/sys_user'
import classes from './index.module.scss'
import AddEditUser from './component/AddEditUser'
import { DataType, userType, getAddUserResult } from '@/type'
const { RangePicker } = DatePicker
import useStore from '@/store'
import { number } from 'echarts'
import async from '@/api/handle401'

const dataList: { key: React.Key; title: string }[] = []

const User: React.FC = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const [resetForm] = Form.useForm()
  const { Search } = Input
  const {
    useUserStore: { userInfo },
  } = useStore()

  // 分页
  const [queryParams, setQueryParams] = useState({ pageNum: 1, pageSize: 10 })
  // 用户列表数据
  const [userList, setUserList] = useState({ count: 0, rows: [] as userType[] })
  //更改用户密码
  const [changePwdModalOpen, setChangePwdModalOpen] = useState(false)
  // 保存 当前选择用户信息
  const [currentUser, setCurrentUser] = useState<userType>({})
  // 新增编辑 model显隐
  const [isModalOpen, setIsModalOpen] = useState(false)
  // true：新增 false：编辑
  const [isAdd, setIsAdd] = useState(true)
  // add user btn
  const [postRole, setPostRole] = useState<getAddUserResult>({ posts: [], roles: [] })
  const [propsValues, setPropsValues] = useState<userType>({
    status: 0,
    sex: 2,
    password: '123456',
  })

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

  // 查询用户列表
  const getUserList = async () => {
    const { data } = await getUserListAPI(queryParams)
    setUserList({ ...data.result })
  }

  //搜索栏提交
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

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
    message.success(data.message)
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
        <div hidden={userInfo.userId === record.userId}>
          <Button
            onClick={() => {
              setIsModalOpen(true)
              setIsAdd(false)
              getUserListFn(record.userId)
            }}
            size="small"
            icon={<EditOutlined />}
            type="link"
          >
            修改
          </Button>
          <Popconfirm
            title="你确认删除该名用户的个人信息吗?"
            onConfirm={() => delUserFn(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" icon={<DeleteOutlined />} type="link">
              删除
            </Button>
          </Popconfirm>
          <Popover
            content={
              <div>
                <Button onClick={() => resetPwdFn(record)} type="link" icon={<UnlockOutlined />}>
                  重置密码
                </Button>
                <Button type="link" icon={<CheckCircleOutlined />}>
                  分配角色
                </Button>
              </div>
            }
            title="Title"
            placement="bottomRight"
          >
            <Button size="small" icon={<DoubleRightOutlined />} type="link">
              更多
            </Button>
          </Popover>
        </div>
      ),
    },
  ]
  // 获取用户数据
  const getUserListFn = async (userId: number) => {
    const { data } = await getUserInfoAPI(userId)
    console.log(326, data.result)
    setPropsValues(data.result)
  }
  // table 数据源
  const data: any = userList.rows
  //#endregion

  // 更改用户密码
  const changePwdhandleOk = () => {
    resetForm.submit()
    setChangePwdModalOpen(false)
  }
  const changePwdCancel = () => {
    setChangePwdModalOpen(false)
    resetForm.resetFields()
  }
  const onResntPwdFinish = async (values: { newPassword: string }) => {
    try {
      const res = await patchUserPwdAPI({
        password: values.newPassword,
        userId: currentUser.userId,
      })
      message.success(currentUser.userName + res.data.message)
      resetForm.resetFields()
    } catch (error) {
      resetForm.resetFields()
    }
  }
  const resetPwdFn = (record: userType) => {
    setCurrentUser(record)
    setChangePwdModalOpen(true)
  }

  // 获取 角色岗位
  const getPostRoleFn = async () => {
    const res = await getPostRoleAPI()

    //遍历生成格式
    setPostRole(res.data.result as getAddUserResult)
  }

  return (
    <Row gutter={16} className={classes['sys-user']}>
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
          form={form}
          name="user"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="leno-search"
        >
          <Form.Item label="用户名称" name="roleName">
            <Input style={{ width: 240 }} placeholder="请输入用户名称" allowClear />
          </Form.Item>
          <Form.Item label="手机号码" name="phonenumber">
            <Input style={{ width: 240 }} placeholder="请输入手机号码" allowClear />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select style={{ width: 240 }} placeholder="用户状态" allowClear>
              <Option value="male">正常</Option>
              <Option value="female">停用</Option>
            </Select>
          </Form.Item>
          <Form.Item label="创建时间" name="creatTime">
            <RangePicker style={{ width: 240 }} />
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
        <Modal
          title="提示"
          open={changePwdModalOpen}
          onOk={changePwdhandleOk}
          onCancel={changePwdCancel}
          centered
        >
          <div style={{ marginBottom: 20 }}>请输入"{currentUser.userName}"的新密码</div>
          <Form form={resetForm} onFinish={onResntPwdFinish}>
            <Form.Item
              name="newPassword"
              rules={[{ required: true, min: 4, max: 11, message: '请输入4-11位密码!' }]}
            >
              <Input.Password placeholder="请输入4-11位密码" />
            </Form.Item>
          </Form>
        </Modal>

        <AddEditUser
          isModalOpen={isModalOpen}
          isAdd={isAdd}
          defaultData={defaultData}
          postRole={postRole}
          propsValues={propsValues}
          onCancel={() => {
            setIsModalOpen(false)
          }}
          onSubmit={() => {
            getUserList()
          }}
        />
      </Col>
    </Row>
  )
}

export default User
