import { Layout } from '@/components/layout';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';

const RootLayout = async ({ children }) => {
  const todos = await getTodos();

  return (
    <Layout>
      <AppStateUpdater title="All Tasks" todos={todos}>
        {children}
      </AppStateUpdater>
    </Layout>
  );
};

export default RootLayout;
