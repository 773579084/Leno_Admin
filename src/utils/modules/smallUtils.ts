import { IIsActive } from '@/type'
/* 当前高亮函数 */
export function currentHighLightFn(obj: IIsActive): string {
  const { isActive } = obj
  return isActive ? 'sidebar current-highlight' : 'sidebar'
}
