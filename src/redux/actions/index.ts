import { Dispatch, Expense } from '../../types';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

// Coloque aqui suas actions
export const addUserAction = (loginInfo: string) => {
  return {
    type: ADD_USER,
    payload: loginInfo,
  };
};

export const addExpenseAction = (expense: Expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

const requestStart = () => {
  return { type: REQUEST_START };
};

const requestSuccess = (currencies: string[]) => {
  return {
    type: REQUEST_SUCCESS,
    payload: currencies,
  };
};

const requestFailed = (error: string) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};

export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
      dispatch(requestSuccess(currencies));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
};
