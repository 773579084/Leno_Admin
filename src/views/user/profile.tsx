import React from 'react'
import { Col, Row } from 'antd'
import classes from './index.module.scss'

const Profile = () => {
  console.log(6, classes)

  return (
    <div className={classes['profile']}>
      <Row>
        <Col span={6}>
          <div className={classes['userinfo_left']}>11</div>
        </Col>
        <Col span={18}>col-12</Col>
      </Row>
    </div>
  )
}

export default Profile
