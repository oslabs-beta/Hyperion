
import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Database from '../../models/database';
import { NewDatabaseForm } from '../../models/database';




// initial state ----- 
const initialState: DataState = {
  databases: {}, 
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
    builder.addCase(addQuery.fulfilled, (state, { query } : NewQuery) => { })
  }
})


// thunk functions
export const {  } = dataSlice.actions;

export default dataSlice.reducer; 


// THunk functions 
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
  async (query: NewQuery, thunkApi) => {
    try {
      const data = await fetch('/api/query/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ databaseId: query.databaseId, query: query.query })
      }).then(res => res.json());
      if (data.statusCode !== 200) { return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE') }; 
      return query; 
    } catch (e) {
      return thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE');
    }
  }
)



export const deleteQuery = createAsyncThunk(
  'data/deleteQuery', 
  async (queryId: number, thunkApi) => {
    try {
      const data = await fetch('api/db/delete', {
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbInfo: { id: queryId } })
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
  // errorMessage: string
}


interface NewQuery {
  databaseId: number, 
  queryId: number, 
  query: string
}

interface DeleteQuery {
  databaseId: number, 
  queryId: number
}










/*


}


export const deleteDb = (id: number) => {
  // return (dispatch: any) => {
  //   // TODO make sure that user is authenticated to be able to delete database 
  //   fetch(`/api/db/delete/${id}`, {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(res => res.json())
  //     .then (data => {
  //       if (data.statusCode === 200) {
  //         dispatch(actionCreators.deleteDatabase(id));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  /// TEST USAGE ONLY
  return (dispatch: any) => {    
    dispatch(actionCreators.deleteDatabase(id));
  }
}


 
// export const connectDb = (id: number) => {
//   return (dispatch) => {
//     // TODO data validation to make sure user is authenticated to connect db 
//     fetch (`/api/db/connect/${id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       })
//       .then(response => response.json()) 
//       .then(data => { 
//         if (data.statusCode === 200) {
//           dispatch(actionCreators.connectDatabase(id))
//         }
//       })
//       .catch(error =>{
//           console.error('Error:', error)
//       })
//   }
// }

export const addQuery = (databaseId: number, query: string) => {
  // return (dispatch: any, getState: any) => {
  //   fetch('/api/query/new', {
  //     method: 'POST', 
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.statusCode === 200) {
  //         dispatch(actionCreators.addQuery(databaseId, query))
  //       }
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //     })
  // }

  /// TEST USAGE ONLY
  const queryId = Math.floor(Math.random() * 10000); 
  console.log('in addQuery Thunk', databaseId, query);
  return (dispatch: any) => {
    dispatch(actionCreators.addQuery(databaseId, queryId, query));
  }
}

export const deleteQuery = (databaseId: number, queryId: number) => {
  //return (dispatch: any, getState: any) => {
  //   fetch(`/api/query/delete/${queryId}`, {
  //     method: 'POST', 
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.statusCode === 200) {
  //         dispatch(actionCreators.deleteQuery(databaseId, query))
  //       }
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //     })
  // }
  return (dispatch: any) => {
    console.log('in deleteuery thunk: databaseId', databaseId, 'queryId', queryId)
    dispatch(actionCreators.deleteQuery(databaseId, queryId))
  }
}

export const runTest = (queryId: number, ...others) => {
  // TEST USAGE ONLY 
  return (dispatch: any) => {
    dispatch(actionCreators.runTest(queryId))
  }
}
*/