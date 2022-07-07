import { useState, useEffect } from 'react'
import { useAddress, useMetamask, useDisconnect, useNFTDrop } from '@thirdweb-dev/react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import NFTDisplay from '../components/NFTDisplay'
import Hero from '../components/Hero'
import Loading from '../components/Loading'
import { useAllowList } from '../utils/allowlist'
import useFetcher from '../utils/fetch'

const styles = {
  app__index_wrapper: 'flex min-h-screen bg-[#b6271c] text-gray-200 ',
  app__index_container: `flex flex-col lg:flex-row flex-1 p-5 pb-20 lg:p-10 space-y-10 lg:space-y-0 before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://azuki.com/twitterimage.jpg')] before:bg-cover before:bg-center before:opacity-60 before:blur overflow-hidden`,
  app__index_infoSection: 'lg:w-2/3 px-10 relative',
  app__index_mobileDisplaySection: 'h-[300px] flex w-full lg:hidden lg:w-1/3 mt-4',
  app__index_desktopDisplaySection: 'hidden lg:flex flex-1 lg:w-1/3',
}

const Home = () => {
  const address =  useAddress();
  const connectWithMetaMask = useMetamask();
  const disconnect = useDisconnect();
  const allowlist =  useAllowList();
  const fetcher = useFetcher()
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_NFT_DROP_ADDRESS)
  const isAdmin = address === process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS

  const [inAllowlist, setAllowList] = useState([])
  const [loading, setLoading] = useState(false)
  const [claimedSupply, setClaimedSupply] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [nftPrice, setNFTPrice] = useState(0)
  const [claimPhases, setClaimPhases] = useState([])

  //Check Airtable AllowList
  useEffect(() => {
    if (!address) return

    const checkAllowlist = async () => {
        setLoading(true)

        try {
            const inAllowlist = await allowlist.check(address)
            setAllowList(inAllowlist)
        } catch (error) {
            console.log(error)
        }
    }

    checkAllowlist()
}, [address])

  //Join Airtable AllowList
  const joinAllowList = async () => {
    setLoading(true)

    try {
        const success = await allowlist.join(address);

        if (success) setAllowList(true)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

  //Access thirdweb NFT drops
useEffect(() => {
  if (!address) return

  const getNFTDropDetails = async () => {
      try {
          const { claimedSupply, totalSupply, nftPrice, claimPhases } = await fetcher.get('/api/get-nft-drop')
          console.log(claimedSupply, totalSupply, nftPrice, claimPhases)

          setClaimedSupply(claimedSupply)
          setTotalSupply(totalSupply)
          setNFTPrice(nftPrice)
          setClaimPhases(claimPhases)
      } catch (error) {
          console.log(error)
      } finally {
          setLoading(false)
      }
  }

  getNFTDropDetails()
}, [address])

//Download Airtable AllowList
const downloadAllowlist = async () => {
  setLoading(true)

  try {
      await allowlist.download()
  } catch (error) {
      console.log(error)
  } finally {
      setLoading(false)
  }
}

  //Mint NFT from thirdweb
const mintNFT = async () => {
  if (!nftDrop) return

  setLoading(true)
  try {
      const quantity = 1
      const transaction = await nftDrop.claimTo(address, quantity)

      const claimedNFT = transaction[0]
      if (claimedNFT) await allowlist.update(address)
  } catch (error) {
      console.log(error)
  } finally {
      setLoading(false)
  }
}
  
  return (
    <>
    {address ? (
    <div className={styles.app__index_wrapper}>
     <Head>
      <title>Home | NFT Drop</title>
     </Head>
     {loading && <Loading/>}
     <div className={styles.app__index_container}>
      <section className={styles.app__index_infoSection}>
         <header>
          <Navbar logout={disconnect} joinAllowList={joinAllowList} inAllowlist = {inAllowlist} isAdmin={isAdmin} downloadAllowlist={downloadAllowlist} />
          </header>
         <div className={styles.app__index_mobileDisplaySection}>
          <NFTDisplay/>
         </div>
        <Hero claimedSupply={claimedSupply} claimPhases= {claimPhases} mintNFT={mintNFT} totalSupply={totalSupply} nftPrice={nftPrice} inAllowlist={inAllowlist} />
      </section>
      <section  className={styles.app__index_desktopDisplaySection}>
      <NFTDisplay/>
      </section>
     </div>
    </div>
    ) : (
      <Login login={connectWithMetaMask}/>
    )}
    </>
  )
}

export default Home