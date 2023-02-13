import { DataTypes } from 'sequelize'
import seq from '@/db/seq.db'

// 创建数据库模型 用户与岗位关联
const UserRole = seq.define(
  'sys_user_role',
  {
    user_id: {
      type: DataTypes.BIGINT,
      comment: '用户ID'
    },
    role_id: {
      type: DataTypes.BIGINT,
      comment: '角色ID'
    }
  },
  {
    tableName: 'sys_user_role', // 强制创建表名
    timestamps: true
  }
)

// 在数据库创建 数据表
// force: true 如果存在相同名字的表，删除旧的表，新建新的表
UserRole.sync()

export default UserRole