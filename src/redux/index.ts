import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: { user: userReducer },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (window.Cypress) window.store = store;

export default store;
