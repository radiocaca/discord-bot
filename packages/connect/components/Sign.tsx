/**
 * Component Sign
 */
import { FC, useContext, useCallback, useState } from "react";
import { SignerContext } from "context/signer";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const Sign: FC = () => {
    const { user } = useRouter().query;
    const { signer, setErr, setErrHelper } = useContext(SignerContext);
    const [msg, setMsg] = useState<string>("Please sign to verify your address");
    const [isVerifying, setIsVerifying] = useState(false);

    const signMessage = useCallback(async () => {
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

        setMsg("Sent verify request to raca, please wailt for 5~10 mins");
        setIsVerifying(true);
        const sig = await signer.signMessage(String(process.env.kycMessage));
        const result = ethers.utils.verifyMessage(String(process.env.kycMessage), sig);
        if (result == await signer.getAddress()) {
            const resp = await fetch(String(process.env.registry + "/verify"), {
                method: "POST",
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sig, user })
            });
            const res = await resp.json();
            console.log(res);
            if (!res.ok) {
                setMsg("Please sign to verify your address");
                setIsVerifying(false);
                setErr(String(res.err));
                setErrHelper(String(res.errHelper));
                return;
            }
            // window.location.href = "https://discord.com/channels/975242155725582416/975242155725582419";
        } else {
            setMsg("Please sign to verify your address");
            setIsVerifying(false);
            setErr("Verify failed");
            setErrHelper("Please click the correct link from discord");
            return;
        }
    }, []);

    return (
        <div className="flex flex-col h-full justify-start items-center mt-64 xl:mt-36 2xl:mt-72">
            <div className="text-raca text-center lg:text-3xl md:text-xl text-base lg:px-0 px-5 text-cl-yellow-200 mb-10">{msg}</div>
            {!isVerifying && <button onClick={signMessage} className="rounded-full lg:py-3 py-2 lg:px-20 px-12 text-white border-raca border-2 lg:text-lg md:text-lg text-sm hover:bg-raca duration-200"> Sign Message</button>}
        </div>
    )
}

export default Sign;

