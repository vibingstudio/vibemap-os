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

const network =
  "https://black-winter-spring.solana-mainnet.discover.quiknode.pro/69fa69dd110279fa7c341e0c5d3b1447e874976a/";

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
