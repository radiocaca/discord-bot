import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProviderContext, createProvider } from "context/provider";

function MyApp({ Component, pageProps }: AppProps) {
  return <ProviderContext.Provider value={createProvider()}><Component {...pageProps} /></ProviderContext.Provider>
}

export default MyApp
