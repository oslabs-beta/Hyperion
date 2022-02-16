// import actionType constants
import * as types from '../constants/actionTypes';

//-------------------------ADD DATABASE ---------------------------
export const addDatabase = (uri, host, port, database, user, password, sslmode, name, connect, savepw) => ({
type: types.ADD_DB,
payload: [ uri, host, port, database, user, password, sslmode, name, connect, savepw]
})

// ----------------------------------------------------------------


//-------------------------DELETE DATABASE ------------------------
export const deleteDatabase = (databaseId) => ({
type: types.DELETE_DB,
payload: databaseId
})
    

// -----------------------------------------------------------------


//-------------------------CONNECT DATABASE ------------------------
export const connectDatabase = () => {
    
}

// -----------------------------------------------------------------