// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';
import { formatAmount } from '../plugins/formatAmount'
import { Provider, Contract, RpcProvider, CallData, stark, Account, WalletAccount, cairo, BigNumberish } from 'starknet';

import { InjectedConnector } from "@starknet-react/core";
import React, { useState, useEffect } from "react";


const useStore = create((set) => ({
  userWallet: {},
  walletAccount: null,

  setWalletAccount: (newWalletAccount) => {
    if (!(newWalletAccount instanceof WalletAccount)) {
      // this must be WalletAccount instance
      newWalletAccount = new WalletAccount(newWalletAccount);
    }
    set({ walletAccount: newWalletAccount });
  },
  updateWallet: async (newWallet) => {
    set({ userWallet: newWallet || {} })
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
      const { abi } = await provider.getClassAt(address);
      const contract = new Contract(abi, address, provider);
      const balance = await contract.balanceOf(useStore.getState().userWallet.selectedAddress);
      console.log("🚀 ~ fetchSTKBalance: ~ balance:", balance)
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
    const withdrawableAmount = await contract.get_withdrawable_amount(
      // useStore.getState().userWallet.selectedAddress
      "0x024e267A819BCDCd4C1cB5b3c8E33c92C40923fF0e6d4494089138Cd386e8007"
    )
    console.log("🚀 ~ getWithdrawBalance: ~ withdrawableAmount:", withdrawableAmount)
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
    const allWithdrawalRequests = await contract.get_all_withdrawal_requests(useStore.getState().userWallet.selectedAddress);
    const availableWithdrawalRequests = await contract.get_available_withdrawal_requests(useStore.getState().userWallet.selectedAddress);
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
    const provider = new Provider({ baseUrl: "https://rpc.sepolia.starknet.io" });
    const contractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(contractAddress);
    const contractABI = abi;

    const userWallet = useStore.getState().walletAccount

    const accountInstance = new Account(provider, userWallet.walletProvider.selectedAddress, userWallet.signer);
    const contract = new Contract(contractABI, contractAddress, provider);

    const entrypoint = "deposit";
    console.log("🚀 ~ stakeToken: ~ calldata:", userWallet)
    const data = CallData.compile({
      amount: cairo.uint256(amount),
      receiver: "0x00D23681f3DeAf6909E4c77694EB486371E5b5C9a0555190de8baaf8b6cF335F",
      user: "0x00D23681f3DeAf6909E4c77694EB486371E5b5C9a0555190de8baaf8b6cF335F",
    })
    console.log("🚀 ~ stakeToken: ~ data:", data)
    // I told you, we need to use wallet account .execute not others
    // https://starknetjs.com/docs/guides/walletAccount#use-as-an-account
    const txResponse = await userWallet.execute([{
      contractAddress: contractAddress,
      calldata: data,
      entrypoint: entrypoint,
    }]);
  }
}));

export default useStore;
