import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThirdwebProvider
            desiredChainId={ChainId.Rinkeby}
            chainRpc={{
                [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/623d3909fb1e4faebf7fce6ada582bcf',
            }}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    )
}

export default MyApp