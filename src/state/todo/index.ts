import { createSlice } from '@reduxjs/toolkit';

import type { SetCompletedAction, SetPinnedAction, SetSummaryAction,  SetTitleAction, SetTodosAction, Todos } from './types';

const todosSlice = createSlice({
  name: 'todos',

  initialState: {
    items  : null,
    summary: null,
    title  : ''
  } as Todos,
  reducers: {
    setTodos: (state, action: SetTodosAction) => {
      state.items = action.payload.items;
    },

    resetTodos: (state) => {
      state.title = '';
      state.items = null;
    },
    setCompleted: (state, action: SetCompletedAction) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: action.payload.completed };
        }

        return item;
      });
    },
    setPinned: (state, action: SetPinnedAction) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, stared: !item.stared };
        }

        return item;
      });
    },
    setSummary: (state, action: SetSummaryAction) => {
      state.summary = { ...action.payload.summary };
    },
    setTitle: (state, action: SetTitleAction) => {
      state.title = action.payload.title;
    }
  }
});

const todosReducer = todosSlice.reducer;
const { setTodos, setTitle, setSummary, resetTodos, setCompleted, setPinned } = todosSlice.actions;

export {
  todosReducer, todosSlice,
  setTodos, setTitle, setSummary, resetTodos, setCompleted, setPinned
};
