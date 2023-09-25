import { Expense } from '../../types';
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  REQUEST_FAILED, REQUEST_START, REQUEST_SUCCESS,
} from '../actions';

const walletState = {
  isFetching: false,
  currencies: [''],
  expenses: [] as Expense[],
  errorMessage: '',
};

type ActionType = {
  type: string;
  payload: number | string | Expense;
};

const walletReducer = (state = walletState, action: ActionType) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isFetching: true,
        currencies: [''],
        errorMessage: '',
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currencies: action.payload,
        errorMessage: '',
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        currencies: [''],
        errorMessage: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          action.payload,
        ],
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};

export default walletReducer;
