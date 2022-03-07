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
    builder.addCase(runTest.fulfilled, (state, action) => {
      console.log('in our runTest fulfilled reducer function')
      console.log('this is action.payload in our runTest reducer', action.payload)
      state.results.push(action.payload);
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
  async (testForm: {dbId?: number, queryId: number}, thunkApi) => {
    // try {
    //   const data = await fetch('SOME API END POINT FOR RUN TEST HERE', {
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify(testForm),
    //     method: 'POST'
    //   }).then(res => res.json());
    //   if (data.status === 200) {
    //     return thunkApi.fulfillWithValue(data);
    //   }
    // } catch (e) {
    //   console.log(e);
    //   return thunkApi.rejectWithValue(e.response.data);
    // }
    console.log('in the runTest thunk function')

  
    const data = {
      queryResults: {
        explainAnalyzeResults: {
          resultsArray: [0.1, 0.2, 0.3, 0.3, 0.3, .5],
          stats: {
            min: .1,
            max: .5, 
            mean: .35, 
            median: .3,
            stdDev: .05, 
            q1: .15,
            q3: .4
          }
        }
      }, 
      testResults: {
        resultsArray: [0.5, 0.6, 0.6, 0.7, 0.7],
        stats: {
          min: .3,
          max: .7, 
          mean: .45, 
          median: .3,
          stdDev: .05, 
          q1: .3,
          q3: .6
        }
      }
    }
    return data;
  }
)
export const {} = testSlice.actions;

export default testSlice.reducer; 