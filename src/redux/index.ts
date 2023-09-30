import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user';
import walletReducer from './reducers/wallet';

export const reducer = combineReducers({
  wallet: walletReducer,
  user: userReducer,
});

const store = configureStore({ reducer });

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<GlobalState, null, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;

if (window.Cypress) window.store = store;

export default store;
