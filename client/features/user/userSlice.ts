import { createSlice } from '@reduxjs/toolkit';

const initialState : UserState = {
  isAuthenticated: true
};

export const userSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {}, 
  extraReducers: () => {

  }
})


interface UserState {
  isAuthenticated: boolean,
}

export const {} = userSlice.actions;

export default userSlice.reducer; 