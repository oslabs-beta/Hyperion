import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [] // contains the data we receive from the server from running the test 
};

export const testSlice = createSlice({
  name: 'test',
  initialState, 
  reducers: {
    // TODOz
  }, 
  extraReducers: (builder) => {

  }
})

export const runTest = createAsyncThunk(
  '/test/run', 
  async () => {
    return 'TODO';
  }
)
export const {} = testSlice.actions;

export default testSlice.reducer; 