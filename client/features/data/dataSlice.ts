
import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Database } from '../../models/database';
import { NewDatabaseForm } from '../../models/database';
import { constructDatabase } from '../../utils/constructors';

// ------------------------- initial state -------------
const initialState: DataState = {
  databases: {}, 
  status: {},
};

// ----- interfaces --------------------------
export interface DataState {
  databases: { [id: number] : Database },
  status: {},
}

interface NewQuery {
  label: string,
  databaseId: number, 
  queryId: number, 
  query: string
}


// ---------------------- slice ----------------------------
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
      const {databaseId, queryId, query, label} = action.payload;
      state.databases[databaseId].queries[queryId] = { id: queryId, queryString: query, label: label };
    }),
    builder.addCase(deleteQuery.fulfilled, (state, action) => { 
      delete state.databases[action.payload.databaseId].queries[action.payload.queryId];
    })
  }
})


// ------------------------- thunk functions --------------

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
export const addDbThunk = createAsyncThunk(
  'data/addDb',
  async (formData: NewDatabaseForm, thunkApi) => {
    // UNCOMMENT FOR REAL IMPLEMENTATION
    // const settings = {
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // };
    // const response = await fetch('/api/db/new', settings);
    // if (response.status !== 200) {
    //   return thunkApi.rejectWithValue('Could not add database');
    // } else {
    //   const data: { id: number } = await response.json();
    //   const db = constructDatabase({
    //     id: data.id, 
    //     port: formData.connectionDetails.port, 
    //     pgDatabaseName: formData.connectionDetails.database,
    //     label: formData.dbInfo.name
    //   })
    //   return db;
    // }
 
    // DELETE WHEN DONE TESTING
    const db = constructDatabase({
      id: Math.floor(Math.random() * 10000),
      port: formData.connectionDetails.port, 
      pgDatabaseName: formData.connectionDetails.database,
      label: formData.dbInfo.name
    })
    return db;
    //////////////////////
  }
)

export const deleteDb = createAsyncThunk(
  'data/deleteDb',
  async (id: number, thunkApi) => {
    console.log('reached deleteDb. heres the id passed in ', id)
    try {
      ////// UNCOMMENT FOR PRODUCTION 
      // const data = await fetch(`/api/db/delete`, {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dbInfo: { id: id }})
      // });
      // if (data.status !== 200) return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
      // else return id; 
      ////////////////////////


      // DELETE FOR PRODUCTION
      return id; 
      ///////////////////////////
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
  async (queryInfo: { databaseId: number, query: string, label: string }, thunkApi) => {
    console.log('trying new query')
    try {
      // UNCOMMENT OUT FOR REAL APPLICATION 
      // const data = await fetch('/api/query/new', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ databaseId: queryInfo.databaseId, query: queryInfo.query })
      // }).then(res => res.json());
      // if (data.statusCode !== 200) { return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE') }; 
      // const newQuery: NewQuery = {
      //   query: queryInfo.query,
      //   databaseId: queryInfo.databaseId,
      //   queryId: data.queryId ///// <------------------ needs to be changed 
      // }
      // return newQuery;
      ///////////////////

      // test purposes only
      const data = await (await fetch('/api/user/getInfo')).json(); 
      const newQuery : NewQuery = {
        label: queryInfo.label,
        query: queryInfo.query,
        databaseId: queryInfo.databaseId, 
        queryId: Math.floor(Math.random() * 10000)
      }
      return newQuery; 
      ///////////////////
    } catch (e) {
      console.log('error in addQuery')
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
    }
  }
)

export const deleteQuery = createAsyncThunk(
  'data/deleteQuery', 
  async (queryInfo: {queryId: number, databaseId: number}, thunkApi) => {
    try {
      // UNCOMMENT THIS OUT WHEN IN PRODUCTION
      // const data = await fetch('api/db/delete', {
      //   method: 'DELETE', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dbInfo: { id: queryInfo.queryId } })
      // }).then(res => res.json());
      // if (data.statusCode !== 200) {
      //   return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
      // }
      // return data; 
      ///////////////////////////////////

      // DELETE THIS WHEN IN PRODUCTION
      return { databaseId: queryInfo.databaseId, queryId: queryInfo.queryId };
    }
    catch (e) {
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
    }
  }
)




export const {  } = dataSlice.actions;

export default dataSlice.reducer; 