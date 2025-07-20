import { Main } from '@/components/main';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';

const Page = async () => {
  const todos = await getTodos();

  return (
    <Main>
      <AppStateUpdater title="All Tasks" todos={todos} />
    </Main>
  );
}

export default Page;
