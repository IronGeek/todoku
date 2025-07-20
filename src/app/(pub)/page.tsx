import { Main } from '@/components/main';
import { getTodos } from '@/services/todo';
import { AppStateUpdater } from '@/state/updater';
import { Todo } from '@/ui/todo';

const Page = async () => {
  const todos = await getTodos();

  return (
    <Main>
      <AppStateUpdater title="All Tasks" todos={todos} />
      <div className="grid grid-cols-2 gap-8">
        <Todo.List className="col-span-2" title="Today" filter="today" />
        <Todo.List className="self-start" title="Tomorrow" filter="tomorrow" />
        <Todo.List className="self-start" title="This Week" filter="this-week" />
      </div>
    </Main>
  );
}

export default Page;
