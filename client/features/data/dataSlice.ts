
import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Database from '../../models/database';
import { NewDatabaseForm } from '../../models/database';



// initial state ----- 
const initialState: DataState = {
  databases: {}, 
  status: {},
};


export const dataSlice = createSlice({
  name: 'data',
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(addDbThunk.fulfilled, (state, action: PayloadAction<Database>) => {
      state.databases[action.payload.id] = action.payload; 
    }),
    //----------------------------
    builder.addCase(deleteDb.fulfilled, (state, action: PayloadAction<number>) => { delete state.databases[action.payload] }),
    builder.addCase(addQuery.fulfilled, (state, action: PayloadAction<NewQuery>) => { 
      const {databaseId, queryId, query} = action.payload;
      state.databases[databaseId].queries[queryId] = { id: queryId, queryString: query };
    }),
    builder.addCase(deleteQuery.fulfilled, (state, action) => { 
      delete state.databases[action.payload.databaseId].queries[action.payload.queryId];
    })
  }
})


// thunk functions
export const {  } = dataSlice.actions;

export default dataSlice.reducer; 

 // TODOO 
export const fetchExistingData = createAsyncThunk(
  'data/fetchExisting', 
  async (userId: number, thunkApi) => {
    const data = await fetch('/api/user/data', {
      method: 'GET',
      body: JSON.stringify({ userId: userId })
    }).then(res => res.json());
  }
)

// Thunk functions 
export const addDbThunk = createAsyncThunk(
  'data/addDb',
  async (formData: NewDatabaseForm, thunkApi) => {
    const settings = {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    };
    
    const data = await fetch('/api/db/new', settings).then(res => res.json());
    if (data.statusCode !== 200) return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
    // create new database from data
    const db = new Database(1,1,'', '', '','',false, 2);
    return db;  // need to change 

  }
)


export const deleteDb = createAsyncThunk(
  'data/deleteDb',
  async (id: number, thunkApi) => {
    try {
      const data = await fetch(`/api/db/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());
      
      if (data.statusCode !== 200) return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
      // need to confirm data first 
      // expecting data to be a status code
      return data;
    }
    catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
    }
  }
)


/// add query 
export const addQuery = createAsyncThunk(
  'data/addQuery',
  async (queryInfo: { databaseId: number, query: string }, thunkApi) => {
    try {
      const data = await fetch('/api/query/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ databaseId: queryInfo.databaseId, query: queryInfo.query })
      }).then(res => res.json());
      if (data.statusCode !== 200) { return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE') }; 
      const newQuery: NewQuery = {
        query: queryInfo.query,
        databaseId: queryInfo.databaseId,
        queryId: data.queryId ///// <------------------ needs to be changed 
      }
      return newQuery; 
    } catch (e) {
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
    }
  }
)

export const deleteQuery = createAsyncThunk(
  'data/deleteQuery', 
  async (queryInfo: {queryId: number, databaseId: number}, thunkApi) => {
    try {
      const data = await fetch('api/db/delete', {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbInfo: { id: queryInfo.queryId } })
      }).then(res => res.json());
      if (data.statusCode !== 200) {
        return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
      }
      return data; 
    }
    catch (e) {
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
    }
  }
)


//  ----- interfaces 
export interface DataState {
  databases: { [id: number] : Database },
  status: {},
}


interface NewQuery {
  databaseId: number, 
  queryId: number, 
  query: string
}

