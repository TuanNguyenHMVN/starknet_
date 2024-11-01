// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';

const useStore = create((set) => ({
  wallet: {},
  updateWallet: (newWallet) => set({ wallet: newWallet }),
  clearUser: () => set({ wallet: {} }),
  balances: {},
  loading: false,
  fetchTokenBalances: async (walletAddress, tokenContracts) => {
    set({ loading: true });
    const provider = new Provider({ network: "mainnet-alpha" });

    const erc20Abi = [
      {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "account", type: "felt" }],
        outputs: [{ name: "balance", type: "felt" }],
      },
    ];

    const balances = {};

    for (const token of tokenContracts) {
      try {
        const contract = new Contract(erc20Abi, token.address, provider);
        const balanceResponse = await contract.balanceOf(walletAddress);
        const balance = number.toBN(balanceResponse.balance).toString();
        balances[token.name] = balance;
      } catch (error) {
        console.error(`Error fetching balance for ${token.name}:`, error);
        balances[token.name] = "Error";
      }
    }

    set({ balances, loading: false });
  },
}));

export default useStore;
