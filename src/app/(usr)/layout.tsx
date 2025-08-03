import { UserLayout } from '@/components/user-layout.tsx';
import { getTodos } from '@/services/todo.ts';
import { AppStateUpdater } from '@/state/updater.ts';

import type { JSX, PropsWithChildren } from 'react';

const RootLayout = async ({ children }: PropsWithChildren): Promise<JSX.Element> => {
  const todos = await getTodos();

  return (
    <UserLayout>
      <AppStateUpdater title="All Tasks" todos={todos}>
        {children}
      </AppStateUpdater>
    </UserLayout>
  );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
