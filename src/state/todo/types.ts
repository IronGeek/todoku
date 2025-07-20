type Writable<T> = { -readonly [P in keyof T]: T[P] };

type TodoGroup = 'past' | 'today' | 'tomorrow' | 'this-week' | 'later';

interface Todo {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly due: number
  readonly list: string
  readonly tags: string[]
  readonly stared: boolean
  readonly done: boolean
}

type GroupedTodos = Record<TodoGroup, Todo[]>;

type TodoFilter = 'all' | 'upcoming' | 'today' | 'done' | 'pin' | 'archive' | string

interface Todos {
  readonly title: string
  readonly items: Todo[]
  readonly grouped: GroupedTodos
}

interface Todos {
  readonly title: string
  readonly items: Todo[]
}

interface SetTodos {
  readonly title: string
  readonly items: Todo[]
}

interface SetItemCompleted {
  id: string
  completed: boolean
}

interface ToggleItemPinned {
  id: string
}

export type {
  Writable, TodoGroup, Todo, Todos, GroupedTodos, SetTodos, SetItemCompleted, ToggleItemPinned, TodoFilter
};
