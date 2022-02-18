// import actionType constants
import * as types from '../constants/actionTypes';

//-------------------------ADD DATABASE ---------------------------
export const addDb = (dbId, name, uri, host, port, database, user, password, sslmode, connect) => ({
type: types.ADD_DB,
payload: { 
    dbId: dbId, 
    name: name, 
    uri: uri, 
    host: host, 
    port: port, 
    database: database, 
    user: user, 
    password: password, 
    sslmode: sslmode, 
    connect: connect
}
})
// ----------------------------------------------------------------


//-------------------------DELETE DATABASE ------------------------
export const deleteDatabase = (databaseId) => ({
type: types.DELETE_DB,
payload: dbId
})
// -----------------------------------------------------------------


//-------------------------CONNECT DATABASE ------------------------
export const connectDatabase = () => {
    
}
// -----------------------------------------------------------------