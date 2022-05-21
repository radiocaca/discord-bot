import type { NextPage } from 'next'
import Head from 'next/head'
import { Header, Footer, WalletButton, Top } from "components";

const Home: NextPage = () => {
    return (
        <div className="--raca-bg flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white font-sans max-width: 1400px;">
            <Head>
                <title>Connect RACA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Top />
            <Header />

            <div className="mx-auto flex flex-col justify-start items-center">
                <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 md:gap-10 gap-3 p-10">
                    <WalletButton name="Metamask" />
                    <WalletButton name="WalletConnect" />
                    <WalletButton name="CoinbaseWallet" />
                </div>
            </div>

            <div className="flex flex-1"></div>

            {/*<Footer />*/}
        </div>
    )
}

export default Home
