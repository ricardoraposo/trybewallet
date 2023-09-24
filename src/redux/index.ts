import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';

const reducers = combineReducers({ user: userReducer });

const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
