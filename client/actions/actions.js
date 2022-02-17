// import actionType constants
import * as types from '../constants/actionTypes';

//-------------------------ADD DATABASE ---------------------------
export const addDb = (name, uri, host, port, database, user, password, sslmode, connect, savepw) => ({
type: types.ADD_DB,
payload: { name, uri, host, port, database, user, password, sslmode, connect, savepw}
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