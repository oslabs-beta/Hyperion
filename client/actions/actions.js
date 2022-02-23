// import actionType constants
import * as types from '../constants/actionTypes';

//-------------------------ADD DATABASE ---------------------------
export const addDb = (id, name, port, database, user, sslMode) => ({
    type: types.ADD_DB,
    payload: { 
        id: id, 
        name: name,
        // host: host, 
        port: port, 
        database: database, 
        user: user, 
        sslMode: sslMode, 
    }
})


//-------------------------DELETE DATABASE ------------------------
export const deleteDatabase = (id) => ({
    type: types.DELETE_DB,
    payload: id
})
// -----------------------------------------------------------------


//-------------------------CONNECT DATABASE ------------------------
export const connectDatabase = (id) => ({
    type: types.CONNECT_DB,
    payload: id
})
// -----------------------------------------------------------------




