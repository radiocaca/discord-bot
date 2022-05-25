/**
 * Component Sign
 */
import { FC, useContext, useCallback } from "react";
import { SignerContext } from "context/signer";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const Sign: FC = () => {
    const { signer, setErr, setErrHelper } = useContext(SignerContext);

    const signMessage = useCallback(async () => {
        const { user } = useRouter().query;
        if (signer === undefined) {
            setErr("Signer not found");
            setErrHelper("Please reconnect to your wallet");
            return;
        };

        if (user === '') {
            setErr("User not found");
            setErrHelper("Please click the correct link from discord");
            return;
        }

        const sig = await signer.signMessage(String(process.env.kycMessage));
        const result = ethers.utils.verifyMessage(String(process.env.kycMessage), sig);
        if (result == await signer.getAddress()) {
            fetch(String(process.env.registry + "/verify"), {
                method: "POST",
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sig, user })
            })
            window.location.href = "https://discord.com/channels/975242155725582416/975242155725582419";
        } else {
            setErr("Verify failed");
            setErrHelper("Please click the correct link from discord");
            return;
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

