import { UserLayout } from '@/components/user-layout';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';

const RootLayout = async ({ children }) => {
  const todos = await getTodos();

  return (
    <UserLayout>
      <AppStateUpdater title="All Tasks" todos={todos}>
        {children}
      </AppStateUpdater>
    </UserLayout>
  );
};

export default RootLayout;
