import { isToday, isTomorrow, isThisWeek, isPast } from 'date-fns';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Writable, GroupedTodos, Todos, Todo, SetItemCompleted, ToggleItemPinned, SetTodos } from './types';

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

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    title: '',
    items: null,
    grouped: null
  },
  reducers: {
    setTodos: (state, action: PayloadAction<SetTodos>) => {
      state.title = action.payload.title;

      state.items = action.payload.items;
      state.grouped = groupTodos(action.payload.items);
    },
    resetTodos: (state) => {
      state.title = '';
      state.items = null;
      state.grouped = null;
    },
    setItemCompleted: (state, action: PayloadAction<SetItemCompleted>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: action.payload.completed }
        }

        return item;
      });
    },
    toggleItemPinned: (state, action: PayloadAction<ToggleItemPinned>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, stared: !item.stared }
        }

        return item;
      });
    },
  },
})

const todosReducer = todosSlice.reducer;
const { setTodos, resetTodos, setItemCompleted, toggleItemPinned } = todosSlice.actions;

export { todosReducer, setTodos, resetTodos, setItemCompleted, toggleItemPinned }
