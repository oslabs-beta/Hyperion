import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const testSlice = createSlice({
  name: 'test',
  initialState, 
  reducers: {
    // TODO 
    runTest: (state, action) => {

    }
  }
})

export const { runTest } = testSlice.actions;

export default testSlice.reducer; 