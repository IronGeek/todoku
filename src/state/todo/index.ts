import { createSlice } from '@reduxjs/toolkit'
import { SetCompletedAction, SetPinnedAction, SetTodosAction, SetSummaryAction, SetTitleAction } from './types';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    title: '',
    items: null,
    summary: null
  },
  reducers: {
    setTodos: (state, action: SetTodosAction) => {
      state.items = action.payload.items;
    },
    resetTodos: (state) => {
      state.title = '';
      state.items = null;
    },
    setTitle: (state, action: SetTitleAction) => {
      state.title = action.payload.title;
    },
    setSummary: (state, action: SetSummaryAction) => {
      state.summary = { ...action.payload.summary };
    },
    setCompleted: (state, action: SetCompletedAction) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: action.payload.completed }
        }

        return item;
      });
    },
    setPinned: (state, action: SetPinnedAction) => {
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
const { setTodos, setTitle, setSummary, resetTodos, setCompleted, setPinned } = todosSlice.actions;

export {
  todosReducer,
  setTodos, setTitle, setSummary, resetTodos, setCompleted, setPinned
}
