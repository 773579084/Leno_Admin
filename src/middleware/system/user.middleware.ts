import { Context } from 'koa'
import {
  getUserListSer,
  getdeptTreeSer,
  getPostSer,
  getRoleSer,
  addUserRoleSer,
  addUserPostSer,
  addUserSer
} from '@/service/system/user.service'
import { userListType, deptType, userType } from '@/types'
import { userIdJudge, addUserJudg } from '@/schema/system/sys.user.schema'
import errors from '@/constants/err.type'
import { formatHumpLineTransfer } from '@/utils'
const { checkUserIdErr, getDeptTreeErr, addUserErr, getPostRoleErr } = errors

// 生成用户列表
const getUserListMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const { pageNum, pageSize } = ctx.query as {
      pageNum: string
      pageSize: string
    }

    const res = (await getUserListSer(pageNum, pageSize)) as userListType

    ctx.state.formatData = res
    await next()
  } catch (error) {
    console.error('查询部门角色失败', error)
    return ctx.app.emit('error', getPostRoleErr, ctx)
  }
}

// 判断用户名id是否正确
const userIdSchema = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const list = ctx.request.path.split('/')
    const userId = list[list.length - 1]
    await userIdJudge.validateAsync({ userId })
    ctx.state.userId = userId
  } catch (error) {
    console.error('用户名id格式错误!', ctx.request.body)
    return ctx.app.emit('error', checkUserIdErr, ctx)
  }
  await next()
}

// 查询部门下拉树结构
const deptTreeMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const res = (await getdeptTreeSer()) as unknown as deptType[]
    // 将部门进行树状结构数据
    const deptTree = []

    for (let i = 0; i < res.length; i++) {
      if (res[i].parent_id === 0) {
        const newObj = {
          key: res[i].dept_id,
          title: res[i].dept_name
        }
        // 此步骤减少递归次数，增加性能
        res.splice(i, 1)
        i ? (i = 0) : i--
        // 递归查找子集结构
        checkChild(newObj, newObj.key)
        function checkChild(obj, parent_id) {
          // 判断 子 父 结构的 parent_id 是否相等
          for (let j = 0; j < res.length; j++) {
            if (res[j].parent_id === parent_id) {
              const newObj = {
                key: res[j].dept_id,
                title: res[j].dept_name
              }
              if (!(obj.children instanceof Array)) obj.children = []
              obj.children.push(newObj)
              res.splice(j, 1)
              j ? (j = 0) : j--
              checkChild(newObj, newObj.key)
            }
          }
        }
        deptTree.push(newObj)
      }
    }

    ctx.state.formatData = deptTree
  } catch (error) {
    console.error('查询部门失败!', ctx.request.body)
    return ctx.app.emit('error', getDeptTreeErr, ctx)
  }
  await next()
}
// 岗位及角色数据获取
const getPostRoleMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const postRes = await getPostSer()
    const roleRes = await getRoleSer()
    ctx.state.formatData = {
      posts: postRes,
      roles: roleRes
    }
    await next()
  } catch (error) {
    console.error('获取部门和角色信息失败', error)
    return ctx.app.emit('error', addUserErr, ctx)
  }
}

// 检查新增用户上传参数
const addUserSchema = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const userList = ctx.request.body as userType
    await addUserJudg.validateAsync(userList)
  } catch (error) {
    console.error('新增用户上传参数出错', error)
    return ctx.app.emit('error', addUserErr, ctx)
  }
  await next()
}

// 新增用户
const getAddUserMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const { postIds, roleIds, ...user } = ctx.request.body as userType
    const newUser = formatHumpLineTransfer(user, 'line')
    const { user_id } = await addUserSer(newUser)
    // //绑定角色岗位关系
    if (roleIds?.length > 0) {
      const createRole = []

      roleIds?.forEach((item) => {
        createRole.push({
          user_id: user_id,
          role_id: item
        })
      })
      await addUserRoleSer(createRole)
    } else if (postIds?.length > 0) {
      const createPost = []
      postIds?.forEach((item) => {
        createPost.push({
          user_id: user_id,
          post_id: item
        })
      })
      await addUserPostSer(createPost)
    }
    await next()
  } catch (error) {
    console.error('新增用户失败', error)
    return ctx.app.emit('error', addUserErr, ctx)
  }
}

export { getUserListMid, userIdSchema, deptTreeMid, getAddUserMid, getPostRoleMid, addUserSchema }