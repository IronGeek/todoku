import { configureStore } from '@reduxjs/toolkit';

import { todosReducer } from '@/state/todo/index.ts';

const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});

type AppStore = typeof store;
type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { AppStore, AppState, AppDispatch };
