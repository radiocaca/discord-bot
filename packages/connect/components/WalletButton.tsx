import { FC } from "react";


const Logo: FC<{name: string}> = ({ name }) => {
    return(
        <div className="xl:w-full w-1/4 flex flex-row xl:justify-center">
            <img src={`/${name.toLowerCase()}.png`}  className="lg:h-12 lg:w-12 h-8 w-8"/>
        </div>
    );
}

export const WalletButton: FC<{ name: string }> = ({ name }) => {
    return (
        <div style={{cursor: "pointer"}}>
            <div
                className="bg-white xl:rounded-lg rounded-full flex xl:flex-col flex-row justify-center items-center xl:py-8 md:py-3 py-3 px-8 hover:scale-105 transform duration-150 text-black"
            >
                <Logo name={name} />
                <h3 className="flex flex-row xl:justify-center font-semibold lg:text-2xl md:text-lg text-base xl:w-full w-3/4">{name}</h3>
            </div>
        </div>
    )
}
