import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <div>
        <Image src="/Logo.png" width={100} height={100} layout="fixed"/>
    </div>
  )
}

export default Logo