import { TodoActions } from '@/ui/todo/actions.tsx';
import { TodoButton } from '@/ui/todo/button.tsx';
import { TodoContent } from '@/ui/todo/content.tsx';
import { TodoHeader } from '@/ui/todo/header.tsx';
import { TodoItem } from '@/ui/todo/item.tsx';
import { TodoList } from '@/ui/todo/list.tsx';
import { TodoMenu } from '@/ui/todo/menu.tsx';
import { TodoMeta } from '@/ui/todo/meta.tsx';

import type { JSX } from 'react';

import type { TodoListProps } from '@/ui/todo/list';

type TodoProps = TodoListProps;

const Todo = (props: TodoProps): JSX.Element => <TodoList {...props} />;

Todo.Actions = TodoActions;
Todo.Button = TodoButton;
Todo.Content = TodoContent;
Todo.Header = TodoHeader;
Todo.Item = TodoItem;
Todo.List = TodoList;
Todo.Menu = TodoMenu;
Todo.Meta = TodoMeta;
Todo.displayName = 'Todo';

export { Todo };
export type { TodoProps };
