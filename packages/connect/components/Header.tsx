import { FC } from "react";
import Image from 'next/image'

export const Header: FC = () => {
    return (
        <div className="flex flex-row rounded-full border border-transparent bg-bar w-11/12 p-3 m-5">
            <Image src="/logo.png" alt="RACA Logo" width={92} height={24} />
        </div>
    )
}

export default Header;
