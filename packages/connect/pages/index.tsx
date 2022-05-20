import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer, WalletButton } from "components";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Connect RACA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Connect{' '}
          <a className="text-blue-600" href="#">
            RACA!
          </a>
        </h1>

        <div className="mt-6 flex max-w-2xl flex-wrap items-center justify-around sm:w-full">
            <WalletButton name="Metamask"/>
            <WalletButton name="WalletConnect" />
            <WalletButton name="CoinbaseWallet" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
