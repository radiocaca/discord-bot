/**
 * Component Sign
 */
import { FC, useContext, useCallback } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ProviderContext } from "context/provider";
import { ethers } from "ethers";

export const Sign: FC = () => {
    const { accounts, provider, setAccounts } = useContext(ProviderContext);

    const signMessage = useCallback(async () => {
        const signer = (provider as Web3Provider).getSigner();
        const sig = await signer.signMessage("Verify account ownership");
        const result = ethers.utils.verifyMessage("Verify account ownership", sig);
        if (result == await signer.getAddress()) {
            window.location.href = "https://discord.com/channels/975242155725582416/975242155725582419";
        }
    }, []);

    return (
        <div className="flex flex-col h-full justify-start items-center mt-64 xl:mt-36 2xl:mt-72">
            <div className="text-raca text-center lg:text-3xl md:text-xl text-base lg:px-0 px-5 text-cl-yellow-200 mb-10">Please sign to verify your address</div>
            <button onClick={signMessage} className="rounded-full lg:py-3 py-2 lg:px-20 px-12 text-white border-raca border-2 lg:text-lg md:text-lg text-sm hover:bg-raca duration-200"> Sign Message</button>
        </div>
    )
}

export default Sign;

