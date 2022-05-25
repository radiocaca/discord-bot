import { FC, useContext } from "react";
import { SignerContext } from "context/signer";

export const Header: FC = () => {
    const { err, errHelper } = useContext(SignerContext);
    return (
        <div className="xl:py-4 w-full">
            <nav className="bg-bar xl:rounded-full xl:mx-10 xl:py-2 xl:px-3 lg:py-2 py-1">
                <div className="flex flex-row items-center sm:m-3 m-2">
                    <img src="/logo.png" alt="RACA Logo" style={{ width: "130px", height: "32px", marginRight: "8px" }} />
                    <span className="w-full"></span>
                    <div className="text-white sm:text-xl text-base flex flex-col justify-center mx-5">
                        <span className="text-red-500 -mb-1 font-semibold text-center">{err}</span>
                        <span className="sm:text-sm text-xs">{errHelper}</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;
