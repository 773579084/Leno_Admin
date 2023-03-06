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
  putUserStatusAPI,
} from '@/api/modules/sysUser'
import classes from './index.module.scss'
import { DataType, userType, getAddUserResult, userQueryType } from '@/type'
const { RangePicker } = DatePicker
import useStore from '@/store'
import ColorBtn from '@/components/ColorBtn'
import AddEditUser from './component/AddEditUser'
import ShowHiddleColumn from './component/ShowHiddleColumn'
import { Key } from 'rc-tree/lib/interface'
import dayjs from 'dayjs'

const dataList: { key: React.Key; title: string }[] = []
const User: React.FC = () => {
  const { Option } = Select
  const [queryForm] = Form.useForm()
  const [resetForm] = Form.useForm()
  const { Search } = Input
  const {
    useUserStore: { userInfo },
  } = useStore()

  // 分页
  const [queryParams, setQueryParams] = useState<userQueryType>({ pageNum: 1, pageSize: 10 })
  // 用户列表数据
  const [userList, setUserList] = useState({ count: 0, rows: [] as userType[] })
  // 用户列表 columns

  // table loading
  const [loading, setLoading] = useState(true)
  //更改用户密码
  const [changePwdModalOpen, setChangePwdModalOpen] = useState(false)
  // 保存 当前选择用户信息
  const [currentUser, setCurrentUser] = useState<userType>({})
  // 新增编辑 model显隐
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 显隐列 model显隐
  const [showHiddenOpen, setShowHiddenOpen] = useState(false)
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  // add user btn
  const [postRole, setPostRole] = useState<getAddUserResult>({ posts: [], roles: [] })
  const [propsValues, setPropsValues] = useState<userType>({
    status: '0',
    sex: '2',
    password: '123456',
  })
  // 非单个禁用
  const [single, setSingle] = useState(true)
  // 非多个禁用
  const [multiple, setMultiple] = useState(true)
  // 控制搜索隐藏显示
  const [searchShow, setSearchShow] = useState(true)
  // 保存table 选择的key
  const [rowKeys, setRowKeys] = useState('')
  // left deptTree
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [defaultData, setdefaultData] = useState<DataNode[]>([])

  // create
  useEffect(() => {
    getUserList()
    generateData()
  }, [])

  useEffect(() => {
    getUserList()
  }, [queryParams])

  // 查询用户列表
  const getUserList = async () => {
    const { data } = await getUserListAPI(queryParams)
    console.log(117, data)

    setUserList({ ...data.result })
    setLoading(false)
  }

  const searchQueryFn = () => {
    let { createdAt, ...form } = queryForm.getFieldsValue()
    if (createdAt) {
      form = {
        ...form,
        beginTime: dayjs(createdAt[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(createdAt[1]).format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    setQueryParams({
      pageNum: 1,
      pageSize: 10,
      ...form,
    })
  }

  const resetQueryFn = () => {
    queryForm.resetFields()
    setQueryParams({ pageNum: 1, pageSize: 10 })
  }

  // 导出excel
  const exportExcelaFn = () => {}

  // row-select
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      if (!selectedRowKeys.length || selectedRowKeys.length > 1) {
        setSingle(true)
      } else {
        setSingle(false)
      }
      selectedRowKeys.length ? setMultiple(false) : setMultiple(true)
      setRowKeys(selectedRowKeys.join(','))
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
  }

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

  //搜索栏提交
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  // tree
  const selectTreeFn = (selectedKeys: Key[]) => {
    setQueryParams({ ...queryParams, deptId: selectedKeys[0] as number })
  }

  //#region table
  // table 首列按钮
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')

  // 分页
  const onPagChange = async (pageNum: number, pageSize: number) => {
    setQueryParams({ pageNum, pageSize })
  }

  // 用户状态修改
  const onUserStaChange = async (checked: string, userId: number) => {
    try {
      const { data } = await putUserStatusAPI({
        status: checked === '0' ? (checked = '1') : (checked = '0'),
        userId,
      })
      message.success(data.message)
      getUserList()
    } catch (error) {}
  }

  // 删除user
  const delUserFn = async (ids: string) => {
    try {
      const { data } = await delUserAPI(ids)
      message.success(data.message)
      setQueryParams({
        pageNum: Math.ceil((userList.count - ids.split(',').length) / queryParams.pageSize),
        pageSize: queryParams.pageSize,
      })
    } catch (error) {}
  }

  // table columns
  let columns = [
    {
      title: '用户编号',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      width: '100px',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: '120px',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      align: 'center',
      width: '150px',
    },
    {
      title: '区域',
      dataIndex: ['dept', 'deptName'],
      key: 'deptName',
      align: 'center',
      width: '120px',
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      align: 'center',
      width: '120px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '80px',
      render: (_: any, record: userType) => (
        <div>
          <Switch
            checked={record.status === '0'}
            onChange={() => {
              if (record.userName === 'admin') {
                message.warn('超级管理员不可停用')
              } else {
                onUserStaChange(record.status as string, record.userId as number)
              }
            }}
          />
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: '160px',
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: '220px',
      fixed: 'right',
      render: (record: userType) => (
        <div hidden={userInfo.userId === record.userId}>
          <Button
            onClick={() => {
              setIsModalOpen(true)
              getUserListFn(record.userId as number)
            }}
            size="small"
            icon={<EditOutlined />}
            type="link"
          >
            修改
          </Button>
          <Popconfirm
            title="你确认删除该名用户的个人信息吗?"
            onConfirm={() => delUserFn(`${record.userId}`)}
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
  ].filter((item) => !targetKeys.some((key) => item.key === key)) as ColumnsType<DataType>

  // 获取用户数据
  const getUserListFn = async (userId: number | string) => {
    const { data } = await getUserInfoAPI(userId)
    setPropsValues(data.result)
    setPostRole({
      posts: data.result.posts,
      roles: data.result.roles,
    } as getAddUserResult)
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
          onSelect={(selectedKeys: Key[]) => {
            selectTreeFn(selectedKeys)
          }}
        />
      </Col>
      <Col span={20}>
        <Form
          form={queryForm}
          hidden={!searchShow}
          layout="inline"
          name={'query'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="leno-search"
        >
          <Form.Item label="用户名称" name="userName">
            <Input
              style={{ width: 240 }}
              placeholder="请输入用户名称"
              allowClear
              onPressEnter={searchQueryFn}
            />
          </Form.Item>
          <Form.Item label="手机号码" name="phonenumber">
            <Input
              style={{ width: 240 }}
              placeholder="请输入手机号码"
              allowClear
              onPressEnter={searchQueryFn}
            />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select style={{ width: 240 }} placeholder="用户状态" allowClear>
              <Option value="0">正常</Option>
              <Option value="1">停用</Option>
            </Select>
          </Form.Item>
          <Form.Item label="创建时间" name="createdAt">
            <RangePicker style={{ width: 240 }} />
          </Form.Item>
          <Form.Item>
            <Button onClick={searchQueryFn} type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={resetQueryFn} icon={<SyncOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
        <Row gutter={16} className="mb10">
          <Col span={16} className="leno-btn">
            <Row gutter={8}>
              <Col>
                <ColorBtn
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setIsModalOpen(true)
                    getPostRoleFn()
                  }}
                >
                  新增
                </ColorBtn>
              </Col>
              <Col>
                <ColorBtn
                  disabled={single}
                  color="success"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsModalOpen(true)
                    getUserListFn(rowKeys)
                  }}
                >
                  修改
                </ColorBtn>
              </Col>
              <Col>
                <ColorBtn
                  onClick={() => delUserFn(rowKeys)}
                  disabled={multiple}
                  color="danger"
                  icon={<DeleteOutlined />}
                >
                  删除
                </ColorBtn>
              </Col>
              <Col>
                <ColorBtn color="info" icon={<ToTopOutlined />}>
                  导入
                </ColorBtn>
              </Col>
              <Col>
                <ColorBtn
                  color="warning"
                  icon={<VerticalAlignBottomOutlined />}
                  onClick={() => {
                    exportExcelaFn()
                  }}
                >
                  导出
                </ColorBtn>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={8} justify="end">
              <Col>
                <Tooltip placement="top" title={searchShow ? '隐藏搜索' : '显示搜索'}>
                  <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={() => {
                      setSearchShow(!searchShow)
                    }}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="刷新">
                  <Button
                    shape="circle"
                    icon={<SyncOutlined />}
                    onClick={() => {
                      searchQueryFn()
                    }}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="top" title="显隐列">
                  <Button
                    shape="circle"
                    icon={<AppstoreFilled />}
                    onClick={() => {
                      setShowHiddenOpen(true)
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="leno-table">
          <Table
            rowSelection={{ type: selectionType, fixed: 'left', ...rowSelection }}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="userId"
            size="middle"
            scroll={{ x: 'max-content' }}
            loading={loading}
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
          defaultData={defaultData}
          postRole={postRole}
          propsValues={propsValues}
          onCancel={(values) => {
            setIsModalOpen(false)
            setPropsValues({
              status: '0',
              sex: '2',
              password: '123456',
            })
          }}
          onSubmit={() => {
            getUserList()
          }}
        />

        <ShowHiddleColumn
          showHiddenOpen={showHiddenOpen}
          columns={columns}
          onSubmit={(keys) => {
            setTargetKeys(keys as string[])
            setShowHiddenOpen(false)
          }}
          onCancel={() => {
            setShowHiddenOpen(false)
          }}
        />
      </Col>
    </Row>
  )
}

export default User
