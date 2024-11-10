// contexts/StarkNetProviderContext.js
import { createContext, useContext } from 'react';
import { starknetProvider } from '../lib/starknetProvider';

const StarkNetProviderContext = createContext();

export function StarkNetProvider({ children }) {
  return (
    <StarkNetProviderContext.Provider value={starknetProvider}>
      {children}
    </StarkNetProviderContext.Provider>
  );
}

export function useStarkNetProvider() {
  return useContext(StarkNetProviderContext);
}
