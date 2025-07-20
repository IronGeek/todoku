import { Main } from '@/components/main';
import { Todo } from '@/ui/todo';
import { getTodos, getTodosTitle } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';

const Page = async ({ params }) => {
  const { type } = await params;
  const todos = await getTodos(type);
  const title = await getTodosTitle(type);

  return (
    <Main>
      <AppStateUpdater title={title} todos={todos} />
      <Todo.List title={title} />
    </Main>
  );
}

export default Page;
