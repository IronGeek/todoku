'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/state/store';

import type { ProviderProps } from 'react-redux';

type AppStateProviderProps = Omit<ProviderProps, 'store'>;

const  AppStateProvider = ({ children, ...props }: AppStateProviderProps) => {
  return (
    <SessionProvider>
      <Provider {...props} store={store}>{children}</Provider>
      </SessionProvider>
  );
};

export { AppStateProvider };
export type  { AppStateProviderProps };
