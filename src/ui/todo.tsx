import { TodoButton } from '@/ui/todo/button'
import { TodoContent } from '@/ui/todo/content'
import { TodoActions } from '@/ui/todo/actions'
import { TodoHeader } from '@/ui/todo/header'
import { TodoList } from '@/ui/todo/list'
import { TodoItem } from '@/ui/todo/item'
import { TodoMenu } from '@/ui/todo/menu'
import { TodoMeta } from '@/ui/todo/meta'

import type { TodoListProps } from '@/ui/todo/list';

type TodoProps = TodoListProps;

const Todo = (props: TodoProps) => <TodoList {...props } />;


Todo.Actions = TodoActions;
Todo.Button = TodoButton;
Todo.Content = TodoContent;
Todo.Header = TodoHeader;
Todo.Item = TodoItem;
Todo.List = TodoList;
Todo.Menu = TodoMenu;
Todo.Meta = TodoMeta;

export { Todo };
export type { TodoProps };
