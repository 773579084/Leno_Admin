import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="不好意思, 此页面未找到。"
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          返回首页
        </Button>
      }
    />
  )
}
export default NotFound
