
import * as actionCreators from '../actions/actions';
import Database from '../models/database';

export const addDb = (formData: object) => {
  // TODO data validation 
  return (dispatch, getState) => {
    fetch('/api/db/new', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {

        // const newDb = new Database();
        const newDb = ''
        // TODO make sure the data object is the right format 
        if (data.statusCode === 200) {
          dispatch(actionCreators.addDb(newDb)) // pass in new database arguments from data
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}


export const deleteDb = (id: number) => {
  return (dispatch: any) => {
    // TODO make sure that user is authenticated to be able to delete database 
    fetch(`/api/db/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then (data => {
        if (data.statusCode === 200) {
          dispatch(actionCreators.deleteDatabase(id));
        }
      })
      .catch(err => {
        console.log(err);
      });
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

  console.log('in addQuery Thunk', databaseId, query);
  return (dispatch: any) => {
    dispatch(actionCreators.addQuery(databaseId, query));
  }
}

export const deleteQuery = () => {

}