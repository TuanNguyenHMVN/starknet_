// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';
import {formatAmount} from '../plugins/formatAmount'
import { Provider, Contract, RpcProvider } from 'starknet';
import { connect, disconnect } from "starknetkit"

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

  availableAmount: 0,
  setAvailableAmount: (amount) => set({ availableAmount: formatAmount(amount) }),

  availableWithdrawBalance: 0,
  setAvailableWithdrawBalance: (newBalance) => set({ availableWithdrawBalance: newBalance }),
  
  estimatedRewards: 0,
  setEstimatedRewards: (amount) => set({ estimatedRewards: amount }),

  estimatedWithdrawal: 0,
  setEstimatedWithdrawal: (amount) => set({ estimatedWithdrawal: amount }),
  
  allWithdrawalRequests: 0,
  setAllWithdrawalRequests: (requests) => set({ allWithdrawalRequests: requests }),

  availableWithdrawalRequests: 0,
  setAvailableWithdrawalRequests: (requests) => set({ availableWithdrawalRequests: requests }),
  
  clearUser: () => set({ wallet: {} }),
  balances: {},
  loading: false,
  fetchSTKBalance: async () => {
    try {
      const provider = new Provider({ 
        nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
      });
      const address = process.env.NEXT_PUBLIC_STARKSCAN_CONTRACT_ADDRESS
      const { abi } = await provider.getClassAt(address);
      const contract = new Contract(abi, address, provider);
      const balance = await contract.balanceOf(useStore.getState().wallet.address)
      console.log("🚀 ~ fetchSTKBalance: ~ wallet.address:", useStore.getState().wallet.address)
      console.log("🚀 ~ fetchSTKBalance: ~ balance:", balance)

      useStore.getState().setAvailableAmount(balance);
      useStore.getState().getWithdrawBalance();
      useStore.getState().getWithdrawalRequests();
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  },

  getWithdrawBalance: async () => {
    const provider = new RpcProvider({ 
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const withdrawableAmount = await contract.get_withdrawable_amount(useStore.getState().wallet.address)
    useStore.getState().setAvailableWithdrawBalance(withdrawableAmount)
  },

  getEstimatedReward: async (amountOfToken, type) => {
    const provider = new RpcProvider({ 
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_LST_CONTRACT_ADDRESS
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    if (type == 'withdraw') {
      const rewards = await contract.convert_to_assets(amountOfToken)
      useStore.getState().setEstimatedWithdrawal(rewards)
    } else {
      const rewards = await contract.convert_to_shares(amountOfToken)
      useStore.getState().setEstimatedRewards(rewards)
    }
  },

  getWithdrawalRequests: async () => {
    const provider = new RpcProvider({ 
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const allWithdrawalRequests = await contract.get_all_withdrawal_requests(useStore.getState().wallet.address);
    const availableWithdrawalRequests = await contract.get_available_withdrawal_requests(useStore.getState().wallet.address);
    useStore.getState().setAllWithdrawalRequests(allWithdrawalRequests)
    useStore.getState().setAvailableWithdrawalRequests(availableWithdrawalRequests)
  },

  requestWithdrawal: async (amount) => {
    const provider = new RpcProvider({ 
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const request = await contract.request_withdrawal(amount);
    useStore.getState().fetchSTKBalance();
  }


}));

export default useStore;
