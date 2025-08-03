import { isAfter, isPast, isThisWeek, isToday, isTomorrow, startOfDay, startOfToday } from 'date-fns';
import { titleCase } from 'title-case';

import todos from '@/lib/data/todo.json' with { type: 'json' };

import type { GroupedTodos, Todo, TodoCategory, TodosFilter, TodoSummary } from '@/state/todo/types';

const categories: TodoCategory[] = ['all', 'upcoming', 'today', 'pin', 'done', 'archive'];

const listPrefix = 'l/';
const lists = todos.reduce((acc, item) => {
  if (acc.indexOf(item.list) < 0) { acc.push(item.list) }

  return acc;
}, []);

const sortBoolean = (a: boolean, b: boolean): number => {
  const boolA = Number(a),
    boolB = Number(b);

  if (boolA > boolB) { return -1 }

  if (boolB > boolA) { return 1 }

  return 0;
};

const sortDate = (a?: number, b?: number): number => {
  if (typeof b === 'undefined') { return typeof a === 'undefined' ? 0 : -1 }

  if (typeof a === 'undefined') { return typeof b === 'undefined' ? 0 : 1 }

  return a - b;
};

const todosSorter = (a: Todo, b: Todo): number => {
  const star = sortBoolean(a.stared, b.stared);
  if (star !== 0) { return star }

  const bool = sortBoolean(b.done, a.done);
  if (bool !== 0) { return bool }

  const date = sortDate(a.due, b.due);
  if (date !== 0) { return date }

  return 0;
};

const resolveSlug = (slug?: string | string[]): string => (Array.isArray(slug) ? slug.join('/') : slug);

const isValidList = (list?: string): boolean => {
  if (list.startsWith(listPrefix)) {
    return lists.includes(list.substring(listPrefix.length));
  }

  return false;
};

const isValidListOrCategory = (slug?: string | string[]): boolean => {
  const listOrCategory = resolveSlug(slug);

  if (typeof listOrCategory === 'undefined') { return true } // Default category

  if (isValidList(listOrCategory)) { return true }

  return categories.includes(listOrCategory as TodoCategory);
};

const getTodosTitle = (listOrCategory?: string): string => {
  if (!listOrCategory) { return 'Tasks' } // Default title

  switch (listOrCategory) {
    case 'upcoming':
    case 'today':
      return titleCase(listOrCategory);
    case 'pin':
      return 'Pinned';
    case 'done':
      return 'Completed';
    case 'archive':
      return 'Archived';

    default:
      return isValidList(listOrCategory) ? titleCase(listOrCategory.substring(listPrefix.length)) : 'Unknown';
  }
};

const getTodosFilter = (listOrCategory?: string): TodosFilter => {
  if (!listOrCategory) { return Boolean }

  switch (listOrCategory) {
    case 'upcoming':
      return (todo) => todo.due && isAfter(new Date(todo.due), startOfToday());
    case 'today':
      return (todo) => todo.due && isToday(new Date(todo.due));
    case 'pin':
      return (todo) => todo.stared;
    case 'done':
      return (todo) => todo.done;
    case 'archive':
      return (todo) => todo.list === 'archive';

    default:
      return isValidList(listOrCategory) ? (todo): boolean => todo.list === listOrCategory.substring(listPrefix.length) : (): boolean => false;
  }
};

const getTodos = async (listOrCategory?: string): Promise<Todo[]> => {
  if (!listOrCategory) { return todos.toSorted(todosSorter) }

  return todos.filter(getTodosFilter(listOrCategory)).toSorted(todosSorter);
};

const getSummary = async (items: Todo[], now: Date = new Date()): Promise<TodoSummary> => {
  const sum: TodoSummary = {
    all     : [0, items?.length ?? 0],
    archive : [0, 0],
    done    : [0, 0],
    list    : {},
    pin     : [0, 0],
    today   : [0, 0],
    upcoming: [0, 0]
  };

  return items?.reduce((acc, item: Todo) => {
    if (item.done) { acc.all[0] += 1 }

    if (item.due) {
      const date = new Date(item.due);
      if (isToday(date)) {
        if (item.done) { acc.today[0] += 1 }

        acc.today[1] += 1;
      }

      if (isAfter(date, startOfDay(now))) {
        if (item.done) { acc.upcoming[0] += 1 }

        acc.upcoming[1] += 1;
      }
    }

    if (item.done) {
      if (item.done) { acc.done[0] += 1 }

      acc.done[1] += 1;
    }

    if (item.stared) {
      if (item.done) { acc.pin[0] += 1 }

      acc.pin[1] += 1;
    }

    const { list } = item;
    if (list === 'archive') {
      if (item.done) { acc.archive[0] += 1 }

      acc.archive[1] += 1;
    } else if (list) {
      acc.list[list] ||= [0, 0];

      if (item.done) { acc.list[list][0] += 1 }

      acc.list[list][1] += 1;
    }

    return acc;
  }, sum) ?? sum;
};

const groupTodos = (items: Todo[]): GroupedTodos => {
  const grouped = items.reduce<GroupedTodos>((acc, todo) => {
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
    later      : [],
    past       : [],
    'this-week': [],
    today      : [],
    tomorrow   : []
  });

  Object.keys(grouped).forEach((k) => {
    grouped[k].sort(todosSorter);
  });

  return grouped;
};

export { resolveSlug, isValidListOrCategory, todosSorter, getTodos, getSummary, getTodosTitle, getTodosFilter, groupTodos };
