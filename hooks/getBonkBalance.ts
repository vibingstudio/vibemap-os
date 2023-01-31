import create, { State } from "zustand";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

interface UserSOLBalanceStore extends State {
  balance: number;
  bonkBalance: number;
  fetchingBalance: boolean;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  bonkBalance: 0,
  fetchingBalance: false,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0;
    let bonkBalance = 0;
    let fetchingBalance = true;
    try {
      balance = await connection.getBalance(publicKey, "confirmed");
      balance = balance / LAMPORTS_PER_SOL;

      const mintToken = new PublicKey(process.env.MINT_TOKEN);
      const associatedTokenFrom = await getAssociatedTokenAddress(
        mintToken,
        publicKey
      );
      const bonksInWallet = await connection.getTokenAccountBalance(
        associatedTokenFrom
      );
      bonkBalance = bonksInWallet.value.uiAmount;
      fetchingBalance = false;
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.balance = balance;
      s.bonkBalance = bonkBalance;
      s.fetchingBalance = fetchingBalance;
    });
  },
}));

export default useUserSOLBalanceStore;
