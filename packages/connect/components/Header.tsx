import { FC } from "react";
import Image from 'next/image'

export const Header: FC = () => {
    return (
        <div className="xl:py-4 w-full">
            <nav className="bg-bar xl:rounded-full xl:mx-10 xl:py-2 xl:px-3 lg:py-2 py-1">
                <div className="flex flex-row items-center sm:m-3 m-2">
                    <img src="/logo.png" alt="RACA Logo" style={{ width: "130px", height: "32px", marginRight: "8px" }} />
                    <span className="w-full"></span>
                </div>
            </nav>
        </div>
    )
}

export default Header;
