import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {}, 
  extraReducers: () => {

  }
})

export const {} = userSlice.actions;

export default userSlice.reducer; 