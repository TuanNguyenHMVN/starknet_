// lib/starknetProvider.js
import { Provider } from 'starknet';

// Choose the appropriate node URL based on your environment
const nodeUrl =
  process.env.NEXT_PUBLIC_STARKNET_NODE_URL || 'https://alpha4.starknet.io'; // Default to testnet

// Create the provider with the node URL
export const starknetProvider = new Provider({
  sequencer: { network: nodeUrl },
});
