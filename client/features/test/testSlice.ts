import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface TestState {
  results: Array<any>, // change to more specific later
  status: 'loaded' | 'loading',
}

const initialState : TestState = {
  results: [], // contains the data we receive from the server from running the test 
  status: 'loaded'
  
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