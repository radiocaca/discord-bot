/**
 * provider context
 */
import { createContext, useState } from "react";
import { Web3Provider } from "@ethersproject/providers"

interface IProviderContext {
  accounts: string[],
  setAccounts: (accounts: string[]) => void;
  provider: Web3Provider | undefined;
  setProvider: (provider: Web3Provider) => void;
}

export const ProviderContext = createContext<IProviderContext>({} as any);

export const createProvider = (): IProviderContext => {
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);

  return { accounts, setAccounts, provider, setProvider}
}


