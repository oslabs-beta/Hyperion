
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Database, NewQuery, Query } from '../../models/database';
import { 
  NewDatabaseRequestBody,
  NewQueryRequestBody,
  GetUserInfoRequestResponse
} from '../../models/api';
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
      const {databaseId, queryId, query, label, params} = action.payload;
      state.databases[databaseId].queries[queryId] = { id: queryId, queryString: query, label: label, params: params};
    }),
    builder.addCase(deleteQuery.fulfilled, (state, action: PayloadAction<{ databaseId: number, queryId: number }>) => { 
      delete state.databases[action.payload.databaseId].queries[action.payload.queryId];
    }),
    builder.addCase(fetchExistingData.fulfilled, (state, action: PayloadAction<GetUserInfoRequestResponse>) => {
      const userData = action.payload; 
      userData.userData.forEach(db => {
        const existingDb = constructDatabase({ id: db.dbId, label: db.dbName, connectionType: db.connectionType });
        db.queries.forEach(query => {
          const dbQuery : Query = {
            id: query.qid, 
            label: query.queryName,
            queryString: query.query.queryString,
            params: query.query.queryParams,
            maxConnections: query.query.maxConnections, 
            throttle: query.query.throttle, 
            repeat: query.query.repeat
          }
          existingDb.queries[query.qid] = dbQuery;
        })
        state.databases[db.dbId] = existingDb;
      })
    })
  }
})


// ------------------------- thunk functions --------------

export const fetchExistingData = createAsyncThunk(
  'data/fetchExisting', 
  async (_: void, thunkApi) => {
    try {
      const data : GetUserInfoRequestResponse = await fetch('/api/user/getinfo', {
        method: 'GET',
      }).then(res => { 
        if (res.status !== 200) {
          throw new Error('Failed to get existing user data')
        } else return res.json();
      });
      return data;
    } catch (e) { return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE') };
  }
)



export const addDbThunk = createAsyncThunk(
  'data/addDb',
  async (formData: NewDatabaseRequestBody, thunkApi) => {
    try {
      console.log("this is the form data for new database request body", formData)
      const settings = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };

      const response = await fetch('api/db/new', settings);
      if (response.status !== 200)  return thunkApi.rejectWithValue('Could not add database');
      else {
        const data: { id: number } = await response.json();
        const db = constructDatabase({
          id: Number(data.id), 
          port: formData.dbInfo.connectionParams.port, 
          pgDatabaseName: formData.dbInfo.connectionParams.database,
          connectionType: formData.dbInfo.connectionType,
          label: formData.dbInfo.dbname,
        })
        return db;
      }
    } catch(e) { return thunkApi.rejectWithValue(e.response.data); }
  }
)

export const deleteDb = createAsyncThunk(
  'data/deleteDb',
  async (id: number, thunkApi) => {
    console.log('reached deleteDb. heres the id passed in ', id)
    try {
      const response = await fetch(`/api/db/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbInfo: { id: id }})
      });
      if (response.status !== 200) return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
      else return id; 
    }
    catch (e) {
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE')
    }
  }
)


export const addQuery = createAsyncThunk(
  'data/addQuery',
  async (queryInfo: { databaseId: number, query: string, label: string, params: Array<Array<string|number>> }, thunkApi) => {
    try {
      const requestBody: NewQueryRequestBody = {
        dbId:  Number(queryInfo.databaseId), 
        queryName: queryInfo.label, 
        query: {
          queryString: queryInfo.query, 
          queryParams: queryInfo.params, 
          maxConnections: 1,
          throttle: 50, 
          repeat: 1
        }
      } 


      console.log('here is the request body being sent to api/query/new', requestBody)
      const response : any = await fetch('/api/query/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
      if (response.status !== 200) return thunkApi.rejectWithValue('Could not add new query');

      const data = await response.json();

      const queryForStore : NewQuery = {
        query: queryInfo.query,
        databaseId: Number(queryInfo.databaseId),
        label: queryInfo.label, 
        params: queryInfo.params,
        queryId: Number(data.queryId)  // might need to check on that 
      }
      return queryForStore; 
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
      const response = await fetch('api/query/remove', {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryId : queryInfo.queryId })
      })
      console.log('response from deleteQuery,', response)
      if (response.status !== 200) return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
      else return { databaseId: queryInfo.databaseId, queryId: queryInfo.queryId };
    }
    catch (e) { return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE'); }
  }
)



export const {  } = dataSlice.actions;

export default dataSlice.reducer; 