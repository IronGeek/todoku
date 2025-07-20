import { startOfToday, isAfter, isToday } from 'date-fns';
import { titleCase } from 'title-case';

import type { Todo } from '@/state/todo/types';

import todos from '@/lib/data/todo.json' with { type: 'json' };

const getTodosTitle = async (type?: 'all' | 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): Promise<string> => {
if (!type) { return 'Todos' }

  switch (type) {
    case 'upcoming':
    case 'today':
      return titleCase(type);

    case 'pin':
      return 'Pinned';

    case 'done':
      return 'Completed';

    case 'all':
      return 'All Tasks';

    case 'archive':
      return 'Archived';

    default:
      return titleCase(type);
  }
}

const getTodos = async (type?: 'all' | 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): Promise<Todo[]> => {
  if (!type) { return todos }

  switch (type) {
    case 'all':
      return todos;

    case 'upcoming':
      return todos.filter((todo) => todo.due && isAfter(new Date(todo.due), startOfToday()));

    case 'today':
      return todos.filter((todo) => todo.due && isToday(new Date(todo.due)));

    case 'pin':
      return todos.filter((todo) => todo.stared);

    case 'done':
      return todos.filter((todo) => todo.done);

    default:
      return todos.filter((todo) => todo.list === type);
  }
};

export { getTodos, getTodosTitle };

