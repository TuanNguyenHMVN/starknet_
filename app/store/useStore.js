// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';
import { Provider, Contract } from 'starknet';

const useStore = create((set) => ({
  wallet: {},
  updateWallet: async (newWallet) => {
    set({ wallet: newWallet })
    await useStore.getState().fetchSTKBalance(newWallet.address);
  },
  
  contract: null,
  setContract: async (newContract) => {
    set({ contract: newContract })
  },
 
  availableWithdrawBalance: 0,
  setAvailableWithdrawBalance: (newBalance) => set({ availableWithdrawBalance: newBalance }),
  
  pendingWithdraws: 0,
  setPendingWithdraws: (pending) => set({ pendingWithdraws: pending }),

  availableRequests: 0,
  setAvailableRequests: (requests) => set({ availableRequests: requests }),
  
  clearUser: () => set({ wallet: {} }),
  balances: {},
  loading: false,
  fetchSTKBalance: async (address) => {
    const STK_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STAKE_STARK_CONTRACT; // Your STK contract address
    const STK_ABI = JSON.parse(process.env.NEXT_PUBLIC_ABI) // ABI json if available

    const provider = new Provider({ 
      baseUrl: 'https://rpc.nethermind.io/sepolia-juno/?apikey=gwpDM5DZqPFX4LqdUZILAjqAnI7cSJwHlWTioEGZ8eUsKtOa',
    });

    const contract = new Contract(STK_ABI, STK_CONTRACT_ADDRESS, provider);
    try {
      useStore.getState().setContract(contract);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  },
  getWithdrawBalance: async () => {
    const walletAddress = useStore.getState().wallet.address;
    const contract = await useStore.getState().contract;
    if (contract) {
      const availableWithdrawBalance = await contract.get_withdrawable_amount(walletAddress)
      useStore.getState().setAvailableWithdrawBalance(availableWithdrawBalance)
    }
  },
  getPendingWithdraws: async () => {
    const contract = await useStore.getState().contract;
    if (contract) {
      const pendingWithdraws = await contract.get_pending_withdrawals()
      useStore.getState().setPendingWithdraws(pendingWithdraws)
    }
  },
  getAvailableWithdrawRequests: async () => { 
    const walletAddress = useStore.getState().wallet.address;
    const contract = await useStore.getState().contract;
    if (contract) {
      const availableRequests = await contract.get_available_withdrawal_requests(walletAddress)
      useStore.getState().setAvailableRequests(availableRequests)
    }
  }
}));

export default useStore;
