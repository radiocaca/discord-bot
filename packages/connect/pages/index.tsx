import type { NextPage } from 'next'
import { ProviderContext } from "context/provider";
import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Head from 'next/head'
import { Header, Footer, Wallets, Top } from "components";

const Home: NextPage = () => {
    const { provider, setProvider, setAccounts } = useContext(ProviderContext);

    useEffect(() => {
        if ((window as any).ethereum) {
            setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
        }
    }, [])

    useEffect(() => {
        if (provider === undefined) return;

        (provider as Web3Provider).send("eth_requestAccounts", []).then((accounts) => {
            setAccounts(accounts)
        })
    }, [provider])

    return (
        <div className="--raca-bg flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white font-sans">
            <Head>
                <title>Connect RACA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Top />
            <Header />

            <Wallets />

            <div className="flex flex-1"></div>
        </div>
    )
}

export default Home
