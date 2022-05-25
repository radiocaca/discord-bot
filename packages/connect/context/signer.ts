/**
 * provider context
 */
import { createContext, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers"

interface ISignerContext {
  signer: JsonRpcSigner | undefined;
  setSigner: (provider: JsonRpcSigner) => void;
  err: string;
  setErr: (err: string) => void;
  errHelper: string;
  setErrHelper: (err: string) => void;
}

export const SignerContext = createContext<ISignerContext>({} as any);

export const createSigner = (): ISignerContext => {
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [err, setErr] = useState<string>('');
  const [errHelper, setErrHelper] = useState<string>('');

  return { signer, setSigner, err, setErr, errHelper, setErrHelper }
}


