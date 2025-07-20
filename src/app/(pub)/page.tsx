import { Main } from '@/components/main';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';
import { Todo } from '@/ui/todo';

const Page = async () => {
  const todos = await getTodos();

  return (
    <Main>
      <AppStateUpdater title="All Tasks" todos={todos} />
      <Todo.List title="Today" filter="today" />
    </Main>
  );
}

export default Page;
