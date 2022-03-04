import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const testSlice = createSlice({
  name: 'test',
  initialState, 
  reducers: {
    // TODO 
    runTest: (state, action) => {

    }
  }, 
  extraReducers: (builder) => {

  }
})


export const {} = testSlice.actions;

export default testSlice.reducer; 