import Joi from 'joi'
import {
  username,
  email,
  sex,
  phonenumber,
  nickName,
  checkNum,
  password,
  remark,
  checkNumArr
} from '../common.schema'

// 验证id
export const userIdJudge = Joi.object({
  userId: Joi.number()
})
// 验证 ids
export const userIdsJudge = Joi.object({
  userId: checkNumArr
})

// 验证新增用户信息
export const addUserJudg = Joi.object({
  nickName,
  deptId: checkNum,
  phonenumber,
  email,
  userName: username,
  sex,
  status: checkNum,
  password,
  postIds: checkNumArr,
  roleIds: checkNumArr,
  remark
})

// 验证修改用户信息
export const putUserJudg = Joi.object({
  nickName,
  deptId: checkNum,
  phonenumber,
  email,
  sex,
  status: checkNum,
  postIds: checkNumArr,
  roleIds: checkNumArr,
  remark,
  userId: Joi.number()
})

// 验证用户密码
export const checkPwdJudg = Joi.object({
  password
})