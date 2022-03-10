import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RunTestResponse } from '../../models/api';
import { Query } from '../../models/database';

interface TestState {
  results: {
    [queryId: number]: {
      databaseId: number, 
      data: RunTestResponse
    } 
  }, // change to more specific later
  status: 'loaded' | 'loading',
}

const initialState : TestState = {
  results: {}, // contains the data we receive from the server from running the test 
  status: 'loaded'
  
};

export const testSlice = createSlice({
  name: 'test',
  initialState, 
  reducers: {
  }, 
  extraReducers: (builder) => {
    builder.addCase(runTest.fulfilled, (state, action: PayloadAction<{ databaseId: number, queryId: number, response: RunTestResponse }>) => {
      state.results[action.payload.queryId] = { databaseId: action.payload.databaseId, data: action.payload.response }; 
      state.status = 'loaded';
    })
    builder.addCase(runTest.pending, (state, action) => {
      state.status = 'loading';
    }),
    builder.addCase(runTest.rejected, (state, action) => { state.status = 'loaded'})
  }
})

export const runTest = createAsyncThunk(
  '/test/run', 
  async (testForm: { dbId: number, queryId: number}, thunkApi) => {
    try {
      const data : RunTestResponse = await fetch('api/db/runtests', {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({ queryId: testForm.queryId }),
      }).then(res => { 
        if (res.status !== 200)  { 
          console.log(' error in runTest. Status was not 200')
          throw new Error('Failure to run test');
        }
        console.log('received response from runTest')
        return res.json();
      });
      console.log('no error in runTest, status was 200 ')
      return { databaseId: testForm.dbId, queryId: testForm.queryId, response: data};
    } catch (e) {
  
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)
export const {} = testSlice.actions;

export default testSlice.reducer; 