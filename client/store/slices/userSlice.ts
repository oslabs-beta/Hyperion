import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    logout: (state) => {

    },
    register: (state) => {

    }, 
    authenticate: (state) => {

    }
  }
})

export const {logout, register, authenticate} = userSlice.actions;

export default userSlice.reducer; 