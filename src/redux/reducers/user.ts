import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

export type UserState = typeof initialState;

// Esse reducer será responsável por tratar as informações da pessoa usuária
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: () => { },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
