import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Rate, Rates } from '../../helpers/api';

type Expense = {
  id: number;
  value: string;
  description: string;
  currency: Rate;
  method: string;
  tag: string;
  exchangeRates: Rates;
};

type WalletState = {
  currencies: string[];
  errorMessage: string | undefined;
  expenses: Expense[];
};

const initialState = {
  currencies: [''],
  errorMessage: undefined,
  expenses: [],
} as WalletState;

export const fetchCurrencies = createAsyncThunk(
  'wallet/fetchCurrencies',
  async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    return currencies as string[];
  },
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      const newExpense = { id: state.expenses.length, ...action.payload };
      state.expenses.push(newExpense);
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.currencies = action.payload;
        },
      )
      .addCase(
        fetchCurrencies.rejected,
        (state, action) => {
          state.errorMessage = action.error.message;
        },
      );
  },
});

export const { addExpense, removeExpense } = walletSlice.actions;

export default walletSlice.reducer;
