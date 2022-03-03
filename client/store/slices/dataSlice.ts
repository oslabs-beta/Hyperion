
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Database from '../../models/database';
import { NewDatabaseForm } from '../../models/database';

//  ----- interfaces 
export interface DataState {
  databases: { [id: number] : Database },
  status: 'Loading'|'Failed'|'Loaded'
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


// initial state ----- 
const initialState: DataState = {
  databases: {}, 
  status: 'Loaded'
};

export const addDbThunk = createAsyncThunk(
  'data/addDb',
  async (formData: NewDatabaseForm) => {
    const settings = {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    };
    try {
      const response = await fetch('/api/db/new', settings);
      const data = await response.json();
      const db = new Database(1,1,'', '', '','',false, 2);
      return db;  // need to change 
    } catch (e) {
      console.log(e);
      return e; 
    }
  }
)



export const dataSlice = createSlice({
  name: 'data',
  initialState, 
  reducers: {
    addDb: (state, action: PayloadAction<Database>) => { state.databases[action.payload.id] = action.payload; },
    deleteDb: (state, action: PayloadAction<number>) => { delete state.databases[action.payload]; },
    addQuery: (state, action: PayloadAction<NewQuery>) => {
      const { databaseId, queryId, query } = action.payload; 
      state.databases[databaseId].queries[queryId] = {id: queryId, queryString: query };
    },
    deleteQuery: (state, action: PayloadAction<DeleteQuery>) => {
      delete state.databases[action.payload.databaseId].queries[action.payload.queryId];
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(addDbThunk.fulfilled, (state, action) => {
      state.databases[action.payload.id] = action.payload; 
    })
  }
})



// thunk functions
export const { addDb, deleteDb, addQuery, deleteQuery } = dataSlice.actions;

export default dataSlice.reducer; 
/*


export const addDb = (formData: NewDatabaseForm) => {
  // TODO data validation 
  // return (dispatch) => {
  //   fetch('/api/db/new', {
  //     method: 'POST', 
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(formData),
  //   })
  //     .then(res => res.json())
  //     .then(data => {

  //       // ADD THIS IN VVVV and remove newdb = ''
  //       // const newDb = new Database();
  //       const newDb = '' 


  //       // TODO make sure the data object is the right format 
  //       if (data.statusCode === 200) {
  //         dispatch(actionCreators.addDb(newDb)) // pass in new database arguments from data
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  /// TEST USAGE ONLY
  return (dispatch: any) => {
    const databaseId = Math.floor(Math.random()*1000);
    const db = new Database(databaseId, 8080, 'example pg database name', `database: ${databaseId}`, 'sslMode', 'user', true);
    dispatch(actionCreators.addDb(db));
  }


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