import { FC } from "react";

export const WalletButton: FC<{ name: string }> = ({ name }) => {
    return (
        <a
            href="#"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
            <h3 className="text-2xl font-bold">{name}</h3>
        </a>
    )
}
