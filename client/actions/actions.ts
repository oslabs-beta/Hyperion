// import actionType constants
import * as types from './actionTypes';
import Database from '../models/database';



//-------------------------ADD DATABASE ---------------------------
export const addDb = (database ) => ({ // database : Database
    type: types.ADD_DB,
    payload: database
})


//-------------------------DELETE DATABASE ------------------------
export const deleteDatabase = (id: number) => ({
    type: types.DELETE_DB,
    payload: id
})
// -----------------------------------------------------------------


//-------------------------CONNECT DATABASE ------------------------
export const connectDatabase = (id: number) => ({
    type: types.CONNECT_DB,
    payload: id
})
// -----------------------------------------------------------------


export const addQuery = (databaseId: number, queryId: number,  query: string) => ({
    type: types.ADD_QUERY,
    payload: {databaseId: databaseId, queryId: queryId, query: query}
})

export const deleteQuery = (databaseId: number, queryId: number) => ({
    type: types.DELETE_QUERY,
    payload: {databaseId: databaseId, queryId: queryId}
})

export const runTest = (queryId: number) => ({
    type: types.RUN_TEST,
    payload: queryId
})