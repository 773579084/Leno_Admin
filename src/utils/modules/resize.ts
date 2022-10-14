import { EChartsType } from 'echarts'

const echartsDom: any[] = [] //所有echarts图表的数组
/**
 * 当屏幕尺寸变化时，循环数组里的每一项调用resize方法来实现自适应。
 * @param {*} eDom
 */
export function echartsResize(eDom: any) {
  echartsDom.push(eDom)
  window.onresize = debounce(() => {
    echartsDom.forEach((it) => {
      it.resize()
    })
  }, 100)
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 * 图表响应式处理
 */
export function debounce(func: { (): void; apply?: any }, wait: number, immediate?: undefined) {
  let timeout: NodeJS.Timeout | null, args: null, context: null, timestamp: number, result: any

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return (args: any) => {
    timestamp = +new Date()
    let context = null
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
