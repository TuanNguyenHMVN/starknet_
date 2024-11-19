// app/store/useStore.js
// "use client"; // Required for Zustand stores in Next.js app directory

import { create } from "zustand";
import { formatAmount } from "../plugins/formatAmount";
import {
  Provider,
  Contract,
  RpcProvider,
  CallData,
  WalletAccount,
  cairo,
} from "starknet";
import { connect } from "get-starknet";

const useStore = create((set) => ({
  userWallet: {},
  walletAccount: null,

  isProcessing: false,
  setIsProcessing: (isProcessing) => set({ isProcessing }),

  connectWallet: async () => {
    const selectedWalletSWO = await connect({
      modalMode: "alwaysAsk",
      modalTheme: "light",
    });
    let myWalletAccount = null;
    if (selectedWalletSWO.id == "argentX") {
      myWalletAccount = new WalletAccount(
        { nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL },
        selectedWalletSWO
      );
    }
    useStore.getState().setWalletAccount(myWalletAccount);
    useStore.getState().updateWallet(selectedWalletSWO);
  },

  setWalletAccount: (newWalletAccount) => {
    if (!(newWalletAccount instanceof WalletAccount)) {
      // this must be WalletAccount instance
      newWalletAccount = new WalletAccount(newWalletAccount);
    }
    set({ walletAccount: newWalletAccount });
  },
  updateWallet: async (newWallet) => {
    set({ userWallet: newWallet || {} });
    await useStore.getState().fetchSTKBalance(newWallet);
  },

  contract: null,
  setContract: async (newContract) => {
    set({ contract: newContract });
  },

  availableAmount: 0,
  setAvailableAmount: (amount) =>
    set({ availableAmount: formatAmount(amount) }),

  availableWithdrawBalance: 0,
  setAvailableWithdrawBalance: (newBalance) =>
    set({ availableWithdrawBalance: newBalance }),

  estimatedRewards: 0,
  setEstimatedRewards: (amount) => set({ estimatedRewards: amount }),

  estimatedWithdrawal: 0,
  setEstimatedWithdrawal: (amount) => set({ estimatedWithdrawal: amount }),

  allWithdrawalRequests: 0,
  setAllWithdrawalRequests: (requests) =>
    set({ allWithdrawalRequests: requests }),

  availableWithdrawalRequests: 0,
  setAvailableWithdrawalRequests: (requests) =>
    set({ availableWithdrawalRequests: requests }),

  clearUser: () => set({ wallet: {} }),
  balances: {},
  loading: false,
  fetchSTKBalance: async () => {
    try {
      const nodeUrl = "https://alpha4.starknet.io";
      const provider = new Provider({
        sequencer: { network: nodeUrl },
      });
      const address = process.env.NEXT_PUBLIC_STARKSCAN_CONTRACT_ADDRESS;
      const { abi } = await provider.getClassAt(address);
      const contract = new Contract(abi, address, provider);
      const balance = await contract.balanceOf(
        useStore.getState().userWallet.selectedAddress
      );
      if (balance === undefined) {
        console.error("Received undefined balance");
        return;
      }
      useStore.getState().setIsProcessing(false);
      useStore.getState().setAvailableAmount(balance);
      useStore.getState().getWithdrawBalance();
      useStore.getState().getWithdrawalRequests();
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  },

  getWithdrawBalance: async () => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const withdrawableAmount = await contract.get_withdrawable_amount(
      useStore.getState().userWallet.selectedAddress
    );
    useStore.getState().setAvailableWithdrawBalance(withdrawableAmount);
  },

  withdraw: async () => {
    const userWallet = useStore.getState().walletAccount;
    const withdrawCallData = CallData.compile({
      user: userWallet.address,
    });
    useStore.getState().setIsProcessing(true);
    await userWallet.execute({
      contractAddress: process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS,
      calldata: withdrawCallData,
      entrypoint: "withdraw",
    });
    useStore.getState().setIsProcessing(false);
  },

  getEstimatedReward: async (amountOfToken, type) => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_LST_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    if (type == "withdraw") {
      const rewards = await contract.convert_to_assets(amountOfToken);
      useStore.getState().setEstimatedWithdrawal(rewards);
    }
  },

  getWithdrawalRequests: async () => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const allWithdrawalRequests = await contract.get_all_withdrawal_requests(
      useStore.getState().userWallet.selectedAddress
    );
    const availableWithdrawalRequests =
      await contract.get_available_withdrawal_requests(
        useStore.getState().userWallet.selectedAddress
      );
    useStore.getState().setAllWithdrawalRequests(allWithdrawalRequests);
    useStore
      .getState()
      .setAvailableWithdrawalRequests(availableWithdrawalRequests);
  },

  requestWithdrawal: async (amount) => {
    const userWallet = useStore.getState().walletAccount;
    const requestWithdrawCallData = CallData.compile({
      shares: cairo.uint256(amount * Math.pow(10, 18)),
      user: userWallet.address,
    });
    useStore.getState().setIsProcessing(true);
    const txResponse = await userWallet.execute({
      contractAddress: process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS,
      calldata: requestWithdrawCallData,
      entrypoint: "request_withdrawal",
    });
    useStore.getState().setIsProcessing(false);
  },

  stakeToken: async (amount) => {
    const userWallet = useStore.getState().walletAccount;

    const approveCallData = CallData.compile({
      spender: process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS,
      amount: cairo.uint256(amount * Math.pow(10, 18)),
    });

    const depositCallData = CallData.compile({
      amount: cairo.uint256(amount * Math.pow(10, 18)),
      receiver: userWallet.address,
      user: userWallet.address,
    });
    useStore.getState().setIsProcessing(true);
    const txResponse = await userWallet.execute([
      {
        contractAddress: process.env.NEXT_PUBLIC_STARKSCAN_CONTRACT_ADDRESS,
        calldata: approveCallData,
        entrypoint: "approve",
      },
      {
        contractAddress: process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS,
        calldata: depositCallData,
        entrypoint: "deposit",
      },
    ]);
    setTimeout(() => {
      useStore.getState().fetchSTKBalance();
    }, 4000);
  },
}));

export default useStore;
