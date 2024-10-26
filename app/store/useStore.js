// app/store/useStore.js
'use client'; // Required for Zustand stores in Next.js app directory

import { create } from 'zustand';

const useStore = create((set) => ({
  wallet: {},
  updateWallet: (newWallet) => set({ wallet: newWallet }),
  clearUser: () => set({ wallet: {} }),
}));

export default useStore;
