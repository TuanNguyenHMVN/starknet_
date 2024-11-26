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
    useStore.getState().setWalletAccount(selectedWalletSWO);
    useStore.getState().updateWallet(selectedWalletSWO);
  },

  setWalletAccount: (newWalletAccount) => {
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

  withdrawableBalance: 0,
  setWithdrawableBalance: (newBalance) =>
    set({ withdrawableBalance: formatAmount(newBalance) }),

  availableStakedStrkAmount: 0,
  setAvailableStakedStrkAmount: (amount) =>
    set({ availableStakedStrkAmount: formatAmount(amount) }),

  stStrkRewards: 0,
  setStStrkRewards: (amount) => set({ stStrkRewards: amount }),

  strkRewards: 0,
  setStrkRewards: (amount) => set({ strkRewards: amount }),

  allWithdrawalRequests: 0,
  setAllWithdrawalRequests: (requests) =>
    set({ allWithdrawalRequests: requests }),

  availableWithdrawalRequests: 0,
  setAvailableWithdrawalRequests: (requests) =>
    set({ availableWithdrawalRequests: requests.length }),

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
      useStore.getState().getWithdrawalRequests();
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  },

  getStakedStrkBalance: async () => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    console.log("🚀 ~ getStakedStrkBalance: ~ abi:", abi)
    const contract = new Contract(abi, address, provider);
    const stakedStrkAmount = await contract.balance_of(
      useStore.getState().userWallet.selectedAddress
    );
    useStore.getState().setAvailableStakedStrkAmount(stakedStrkAmount);
  },

  getWithdrawableBalance: async () => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const withdrawableAmount = await contract.get_withdrawable_amount(
      useStore.getState().userWallet.selectedAddress
    );
    useStore.getState().setWithdrawableBalance(withdrawableAmount);
  },

  withdraw: async () => {
    const userWallet = useStore.getState().walletAccount;
    useStore.getState().setIsProcessing(true);
    console.log("🚀 ~ withdraw: ~ process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS:", process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS)

    const tx = await userWallet.account.execute({
      contractAddress: process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS,
      entrypoint: "withdraw",
    });
    useStore.getState().setIsProcessing(false);
  },

  convertToShares: async (amount) => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const rewards = await contract.convert_to_shares(amount);
    useStore.getState().setStStrkRewards(rewards);
  },

  convertToAssets: async (amount) => {
    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PRIVATE_PROVIDER_URL,
    });
    const address = process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS;
    const { abi } = await provider.getClassAt(address);
    const contract = new Contract(abi, address, provider);
    const rewards = await contract.convert_to_assets(amount);
    useStore.getState().setStrkRewards(rewards);
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
    console.log("🚀 ~ getWithdrawalRequests: ~ allWithdrawalRequests:", allWithdrawalRequests)
    useStore.getState().setAllWithdrawalRequests(allWithdrawalRequests);
    const availableWithdrawalRequests =
      await contract.get_available_withdrawal_requests(
        useStore.getState().userWallet.selectedAddress
      );
      console.log("🚀 ~ getWithdrawalRequests: ~ availableWithdrawalRequests:", availableWithdrawalRequests)

    useStore
      .getState()
      .setAvailableWithdrawalRequests(availableWithdrawalRequests);
  },

  requestWithdrawal: async (amount) => {
    const userWallet = useStore.getState().walletAccount;
    const requestWithdrawCallData = CallData.compile({
      shares: cairo.uint256(amount * Math.pow(10, 18)),
    });
    useStore.getState().setIsProcessing(true);
    const txResponse = await userWallet.account.execute({
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
      receiver: userWallet.selectedAddress,
      user: userWallet.selectedAddress,
    });
    useStore.getState().setIsProcessing(true);
    await userWallet.account.execute([
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
