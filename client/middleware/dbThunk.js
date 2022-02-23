
import { response } from 'express';
import * as actionCreators from '../actions/actions';




export const addDb = (formData) => {
  
  // TODO data validation 
  return (dispatch, getState) => {
    fetch('/api/db/new', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        // TODO make sure the data object is the right format 
        if (data.statusCode === 200) {
          dispatch(actionCreators.addDb()) // pass in new database arguments from data
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}


export const deleteDb = (id) => {

  return (dispatch, getState) => {
    // TODO make sure that user is authenticated to be able to delete database 
    fetch(`/api/db/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then (data => {
        if (data.statusCode === 200) {
          dispatch(actionCreators.deleteDb(id));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}


 
export const connectDb = (id) => {
  
  return (dispatch, getState) => {

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


