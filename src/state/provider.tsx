'use client';

import { Provider } from 'react-redux';
import { store } from '@/state/store';

import type { ProviderProps } from 'react-redux';

type AppStateProviderProps = Omit<ProviderProps, 'store'>;

const  AppStateProvider = ({ children, ...props }: AppStateProviderProps) => {
  return (
    <Provider {...props} store={store}>{children}</Provider>
  );
};

export { AppStateProvider };
export type  { AppStateProviderProps };
