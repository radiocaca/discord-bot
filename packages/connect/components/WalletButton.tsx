import { FC, useCallback, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { ProviderContext } from "context/provider";

type Wallet = "Metamask" | "WalletConnect" | "CoinbaseWallet";

const Logo: FC<{name: string}> = ({ name }) => {
    return(
        <div className="xl:w-full w-1/4 flex flex-row xl:justify-center">
            <img src={`/${name.toLowerCase()}.png`}  className="lg:h-12 lg:w-12 h-8 w-8"/>
        </div>
    );
}

export const WalletButton: FC<{
    name: Wallet,
}> = ({ name }) => {
    const { setAccounts, provider, setProvider } = useContext(ProviderContext);

    const cb = useCallback(async () => {
        // TODO
        //
        // only support metamask for now
        if (name === "Metamask" && provider === undefined) {
            setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
        }
    }, []);

    return (
        <div style={{cursor: "pointer"}} onClick={cb}>
            <div
                className="bg-white xl:rounded-lg rounded-full flex xl:flex-col flex-row justify-center items-center xl:py-8 md:py-3 py-3 px-8 hover:scale-105 transform duration-150 text-black"
            >
                <Logo name={name} />
                <h3 className="flex flex-row xl:justify-center font-semibold lg:text-2xl md:text-lg text-base xl:w-full w-3/4">{name}</h3>
            </div>
        </div>
    )
}

export const Wallets: FC<{
}> = ({ }) => {
    const { provider, setAccounts } = useContext(ProviderContext);
    if (provider !== undefined) {
        return <></>;
    }

    return (
        <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 md:gap-10 gap-3 p-10" style={{ maxWidth: "1400px" }}>
            {
                [
                    "Metamask",
                    "WalletConnect",
                    "CoinbaseWallet"
                ].map(
                  (v) => <WalletButton key={v} name={v as Wallet} />
                )
            }
        </div>
    );
}
