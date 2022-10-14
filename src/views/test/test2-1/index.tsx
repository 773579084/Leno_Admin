import React from 'react'
import SvgIcon from '@/components/SvgIcon'

const Index = () => {
  const testFn = () => {
    console.log(6)
  }
  return (
    <div>
      <SvgIcon iconClass="矿泉水" click={testFn} />
    </div>
  )
}
export default Index
