type TodoGroup = 'past' | 'today' | 'tomorrow' | 'this-week' | 'later';

interface SetItemCompleted {
  id: string
  completed: boolean
}

interface Todo {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly due: number
  readonly list: string
  readonly tags: string[]
  readonly done: boolean
}

type GroupedTodos = Record<TodoGroup, Todo[]>;

interface Todos {
  readonly title: string
  readonly items: Todo[]
}

type Writable<T> = { -readonly [P in keyof T]: T[P] };

export type { Writable, TodoGroup, Todo, Todos, GroupedTodos, SetItemCompleted };
