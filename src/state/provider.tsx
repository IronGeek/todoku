'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import { store } from '@/state/store.ts';

import type { JSX } from 'react';
import type { ProviderProps } from 'react-redux';

type AppStateProviderProps = Omit<ProviderProps, 'store'>;

const AppStateProvider = ({ children, ...props }: AppStateProviderProps): JSX.Element => (
  <SessionProvider>
    <Provider {...props} store={store}>{children}</Provider>
  </SessionProvider>
);

AppStateProvider.displayName = 'AppStateProvider';

export { AppStateProvider };
export type { AppStateProviderProps };
