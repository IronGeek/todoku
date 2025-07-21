import { startOfToday, isAfter, isToday, isTomorrow, isThisWeek, isPast } from 'date-fns';
import { titleCase } from 'title-case';

import type { GroupedTodos, Todo, TodosFilter } from '@/state/todo/types';

import todos from '@/lib/data/todo.json' with { type: 'json' };

const isValidType = (type?: 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): boolean =>{
  if (typeof type === 'undefined') { return true }

  return ['upcoming','today','pin','done','archive','personal','work','health','shopping','other','misc'].includes(type);
}

const getTodosTitle = (type?: 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): string => {

if (!type) { return 'All Tasks' }

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

const getTodosFilter = (type?: 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): TodosFilter => {
  if (!type) { return Boolean }

  switch (type) {
    case 'upcoming':
      return (todo) => todo.due && isAfter(new Date(todo.due), startOfToday());

    case 'today':
      return (todo) => todo.due && isToday(new Date(todo.due));

    case 'pin':
      return (todo) => todo.stared;

    case 'done':
      return (todo) => todo.done;

    default:
      return (todo) => todo.list === type;
  }
};

const getTodos = async (type?: 'upcoming' | 'today' | 'pin' | 'done' | 'archive' | string): Promise<Todo[]> => {
  if (!type) { return todos }

  switch (type) {
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

const groupTodos = (todos: Todo[]): GroupedTodos => {
  const grouped = todos.reduce<GroupedTodos>((acc, todo) => {
    if (!todo.due) {
      acc.later.push(todo);
    } else {
      const date = new Date(todo.due);

      if (isToday(date)) {
        acc.today.push(todo);
      } else if (isTomorrow(date)) {
        acc.tomorrow.push(todo);
      } else if (isThisWeek(date)) {
        acc['this-week'].push(todo);
      } else if (isPast(date)) {
        acc.past.push(todo);
      } else {
        acc.later.push(todo);
      }
    }
    return acc;
  }, {
    past         : [],
    today        : [],
    tomorrow     : [],
    ['this-week']: [],
    later        : []
  });

  Object.keys(grouped).forEach((k) => {
    grouped[k].sort((a, b) => a.due - b.due);
  })

  return grouped;
}

export { isValidType, getTodos, getTodosTitle, getTodosFilter, groupTodos };

