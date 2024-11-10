// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';
import {formatAmount} from '../plugins/formatAmount'
import { Provider, Contract, RpcProvider } from 'starknet';
import { connect, disconnect } from "starknetkit"

import { useAccount, useStarknetExecute } from '@starknet-react/core';


const useStore = create((set) => ({
  userWallet: '',
  updateWallet: async (newWallet) => {
    set({ userWallet: newWallet })
    await useStore.getState().fetchSTKBalance(newWallet);
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
      // const provider = new RpcProvider({ 
      //   nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
      // });
      const nodeUrl = 'https://alpha4.starknet.io';
      const provider = new Provider({
        sequencer: { network: nodeUrl },
      });
      const address = process.env.NEXT_PUBLIC_STARKSCAN_CONTRACT_ADDRESS;
      console.log("🚀 ~ fetchSTKBalance: ~ address:", address)
      const { abi } = await provider.getClassAt(address);
      const contract = new Contract(abi, address, provider);
      const balance = await contract.balanceOf(useStore.getState().userWallet);
      if (balance === undefined) {
        console.error('Received undefined balance');
        return;
      }
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
    const withdrawableAmount = await contract.get_withdrawable_amount(useStore.getState().userWallet)
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
    const allWithdrawalRequests = await contract.get_all_withdrawal_requests(useStore.getState().userWallet);
    const availableWithdrawalRequests = await contract.get_available_withdrawal_requests(useStore.getState().userWallet);
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
  },

  stakeToken: async (amount) => {
    // const { account } = useAccount();  // Get connected account
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const currentUser = useStore.getState().userWallet;
    const { execute } = useStarknetExecute({
      calls: [
        {
          contractAddress: address,  // Replace with your contract address
          entrypoint: 'deposit',  // Replace with the entrypoint function name
          calldata: [amount, address, currentUser],  // Replace with your calldata as an array of parameters
        },
      ],
    });
    const transaction = await execute(); 
    console.log("🚀 ~ stakeToken: ~ transaction:", transaction)
    // const provider = new RpcProvider({ 
    //   nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    // });
    // const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    // const { abi } = await provider.getClassAt(address);
    // const contract = new Contract(abi, address, provider);
    // const currentUser = useStore.getState().userWallet;
    // const response = await contract.deposit(amount, address, currentUser);
    // console.log("🚀 ~ stakeToken: ~ response:", response)
    // // // const request = await contract.request_withdrawal(amount);
    // useStore.getState().fetchSTKBalance();
  }


}));

export default useStore;
