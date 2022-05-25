import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SignerContext, createSigner } from "context/signer";

function MyApp({ Component, pageProps }: AppProps) {
  return <SignerContext.Provider value={createSigner()}><Component {...pageProps} /></SignerContext.Provider>
}

export default MyApp
