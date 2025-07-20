import { TodoList } from '@/ui/todo/list';
import { TodoItem } from '@/ui/todo/item';

import type { TodoListProps } from '@/ui/todo/list';

type TodoProps = TodoListProps;
const Todo = (props: TodoProps) => <TodoList {...props } />;

Todo.List = TodoList;
Todo.Item = TodoItem;

export { Todo };
