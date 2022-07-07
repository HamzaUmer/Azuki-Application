import React from 'react'
import Image from 'next/image'

const styles = {
    app__display_wrapper: 'bg-animate flex-1 rounded-3xl flex lg:flex-col items-center relative',
}

const NFTDisplay = () => {
    const nfts = ['/azuki_1.png','/azuki_2.png','/azuki_3.png', '/azuki_4.png', '/azuki_5.png','/azuki_6.png','/azuki_7.png','/azuki_8.png', '/azuki_9.png', '/azuki_10.png'];
  return (
    <div className={styles.app__display_wrapper}>
        <div className='absolute inset-0 flex snap-x items-center gap-4 overflow-x-scroll px-20'>
            {nfts.map((item,i) => (
                <div key={i} className="relative h-[200px] w-[200px] flex-shrink-0 snap-center lg:rounded-xl lg:h-[530px] lg:w-[528px]">
                       <Image  src={item} layout="fill"/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NFTDisplay