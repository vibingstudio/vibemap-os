import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter , } from "@solana/wallet-adapter-phantom";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const network = process.env.RPC_ENDPOINT;

const RootLayout = ({ children }: { children: any }) => {
  // const network = "https://api.mainnet-beta.solana.com/";
  // set custom RPC server endpoint for the final website
  // const endpoint = "https://explorer-api.devnet.solana.com";
  // const endpoint = "http://127.0.0.1:8899";
  // const endpoint = "https://ssc-dao.genesysgo.net";
  const endpoint = useMemo(() => network, [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new LedgerWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default RootLayout;
