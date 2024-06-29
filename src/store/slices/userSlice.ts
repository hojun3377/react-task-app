import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.id = payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
