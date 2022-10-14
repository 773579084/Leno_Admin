import React, { useState } from 'react'
import { Avatar, Dropdown, message, Menu, Modal } from 'antd'
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import avatar from '@/assets/images/avatar.jpeg'
import useStore from '@/store'
import { HOME_URL } from '@/config/config'

const avatarCom = () => {
  const navigate = useNavigate()
  const {
    useUserStore: { removeToken },
  } = useStore()

  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState(`确认退出系统吗？`)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 1000)
    removeToken()
    message.success('退出登录成功！')
    navigate('/login')
  }

  const handleCancel = () => setVisible(false)

  const layout = () => setVisible(true)

  const menu = (
    <Menu
      items={[
        {
          key: 'name',
          label: <div style={{ color: '#b2aeae', userSelect: 'none' }}>Wen Chao</div>,
          type: 'group',
        },
        {
          type: 'divider',
        },
        {
          key: '1',
          label: <span>首页</span>,
          onClick: () => navigate(HOME_URL),
        },
        {
          key: '2',
          label: <span>个人中心</span>,
        },
        {
          key: '3',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://gitee.com/zhao-wenchao110/eazy-admin"
            >
              项目地址
            </a>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '4',
          label: <span>退出登录</span>,
          onClick: layout,
        },
      ]}
    />
  )

  return (
    <div style={{ marginLeft: 16 }}>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
      >
        <Avatar size="default" src={avatar} />
      </Dropdown>
      <Modal
        title="提示"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>
          <ExclamationCircleTwoTone style={{ marginRight: 10 }} />
          {modalText}
        </p>
      </Modal>
    </div>
  )
}
export default avatarCom
