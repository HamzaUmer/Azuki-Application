import React from 'react'
import { CheckIcon, ClockIcon } from '@heroicons/react/outline'
import Timeline from './Timeline'

const styles = {
    app__hero_wrapper: 'flex w-full items-center justify-center pt-16 lg:pt-20',
    app__hero_container: `space-y-10 `,
    app__hero_title: 'xl:pr-40 text-6xl font-bold',
    app__hero_paragraph: 'xl:pr-40 text-[#FFFDD0] relative font-semibold text-lg',
    app__hero_cta: 'flex items-center space-x-10',
    app__hero_mintButton: 'rounded-xl border border-gray-100 bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-[#b6271c] hover:text-[#FFFDD0] cursor-pointer',
}

const Hero = ({claimedSupply, totalSupply, inAllowlist, nftPrice, claimPhases, mintNFT}) => {
  const timelines = claimPhases.map((phase) => {
    const now = new Date().getTime()
    const hasPast = now > phase.startTime

    return {
        ...phase,
        icon: hasPast ? CheckIcon : ClockIcon,
        iconBackground: hasPast ? 'bg-green-500' : 'bg-gray-400',
    }
})
  return (
   <main className= {styles.app__hero_wrapper}>
    <div className={styles.app__hero_container}>
        <h1 className={styles.app__hero_title}>Azuki NFT Collection</h1>
        <p className={styles.app__hero_paragraph}>Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. 
        </p>
        <ul>
            {timelines.map((timeline, index) => (
             <Timeline key={index} index={index} timeline={timeline} isLastTimeline={timelines.length === index + 1} />
             ))}
        </ul>
        <div className={styles.app__hero_cta}>
          {inAllowlist && (
            <button onClick={mintNFT} className={styles.app__hero_mintButton} >
              Mint Your NFT ({nftPrice} ETH)
            </button>
          )}
          <p>
            {claimedSupply} / {totalSupply} claimed
          </p>
        </div>
    </div>
   </main>
  )
}

export default Hero