"use client"
import { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};

// Hook to use the QueryClient context
export const useQueryClientContext = () => {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error('useQueryClientContext must be used within a QueryClientProviderWrapper');
  }
  return context;
};
