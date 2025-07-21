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

type TodosFilter = (item: Todo) => boolean;

interface TodoSummary {
  readonly upcoming: [number, number]
  readonly today   : [number, number]
  readonly done    : [number, number]
  readonly pin     : [number, number]
  readonly all     : [number, number]
  readonly archive : [number, number]
  readonly list    : Record<string, [number, number]>
}

interface Todos {
  readonly title: string
  readonly items: Todo[]
  readonly summary: TodoSummary
}

interface SetTodos {
  readonly items: Todo[]
}

interface SetTitle {
  readonly title: string
}

interface SetSummary {
  readonly summary: TodoSummary
}

interface SetCompleted {
  readonly id: string
  readonly completed: boolean
}

interface SetPinned {
  readonly id: string
  readonly stared: boolean
}

export type {
  Writable, TodoGroup, Todo, Todos, GroupedTodos, TodoSummary, TodosFilter,
  SetTodos, SetTitle, SetSummary, SetCompleted, SetPinned
};
