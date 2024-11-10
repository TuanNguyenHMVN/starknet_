// lib/walletConnectors.js
import { InjectedConnector } from '@starknet-react/core';

export const argentX = new InjectedConnector({ id: 'argentX' });
export const braavos = new InjectedConnector({ id: 'braavos' });

// Export connectors in an array for easy management
export const walletConnectors = [argentX, braavos];
