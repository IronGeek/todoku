import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Layout } from '@/components/layout';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const RootLayout = async ({ children }) => {
  const data = await getServerSession(authOptions);
  if (!data) { redirect('/signin') }

  const todos = await getTodos();
  console.log(todos, data);

  return (
    <Layout>
      <AppStateUpdater title="All Tasks" todos={todos}>
        {children}
      </AppStateUpdater>
    </Layout>
  );
};

export default RootLayout;
