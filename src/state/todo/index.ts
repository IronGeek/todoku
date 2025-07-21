import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SetCompleted, SetPinned, SetTodos, SetSummary, SetTitle } from './types';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    title: '',
    items: null,
    summary: null
  },
  reducers: {
    setTodos: (state, action: PayloadAction<SetTodos>) => {
      state.items = action.payload.items;
    },
    resetTodos: (state) => {
      state.title = '';
      state.items = null;
    },
    setTitle: (state, action: PayloadAction<SetTitle>) => {
      state.title = action.payload.title;
    },
    setSummary: (state, action: PayloadAction<SetSummary>) => {
      state.summary = { ...action.payload.summary };
    },
    setCompleted: (state, action: PayloadAction<SetCompleted>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: action.payload.completed }
        }

        return item;
      });
    },
    setPinned: (state, action: PayloadAction<SetPinned>) => {
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
