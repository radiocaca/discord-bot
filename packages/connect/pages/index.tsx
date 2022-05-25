import type { NextPage } from 'next'
import { SignerContext } from "context/signer";
import { useEffect, useContext } from "react";
import Head from 'next/head'
import { Header, Footer, Wallets, Top, Sign } from "components";

const Home: NextPage = () => {
    const { signer, setSigner } = useContext(SignerContext);

    return (
        <div className="--raca-bg flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white font-sans">
            <Head>
                <title>Connect RACA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Top />
            <Header />

            {!signer && <Wallets />}
            {signer && <Sign />}

            <div className="flex flex-1"></div>
        </div>
    )
}

export default Home
