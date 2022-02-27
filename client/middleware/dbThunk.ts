
import * as actionCreators from '../actions/actions';
import Database from '../models/database';
import { NewDatabaseForm } from '../models/database';

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


 
export const connectDb = (id: number) => {
  return (dispatch) => {
    // TODO data validation to make sure user is authenticated to connect db 
    fetch (`/api/db/connect/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json()) 
      .then(data => { 
        if (data.statusCode === 200) {
          dispatch(actionCreators.connectDatabase(id))
        }
      })
      .catch(error =>{
          console.error('Error:', error)
      })
  }
}

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

const runTest = (queryId: number, ...others) => {
  // TEST USAGE ONLY 
  return (dispatch: any) => {
    dispatch(actionCreators.runTest(queryId))
  }
}