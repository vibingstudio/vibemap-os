import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/normalize.css";
import "../styles/pagination.css";
import "../styles/navstyles.css";

import type { AppProps } from "next/app";

const network = process.env.RPC_ENDPOINT;

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => network, [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new LedgerWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
