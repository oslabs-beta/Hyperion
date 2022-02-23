import * as types from '../constants/actionTypes';
import { addDatabse } from '../actions/actions.js';


const initialState = { 
    databaseInfo: {}, 
    /*
    {
        id: {
            id: Number, 
            port: Number,
            database: String (database name referred to by postgres),
            name: String (database name provided by user),
            sslMode: String 
            user: String,
            isConnected: Boolean, 
            queries: {
                queryId (Number) : query (String)
            }
        }, 
        ... 
    }
    */
};

const dbReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case types.ADD_DB:
            const databaseInfo = JSON.parse(JSON.stringify(state.databaseInfo));
            databaseInfo[action.payload.id] = { ...action.payload, isConnected: false, queries: {} };
            return {
                ...state,
                databaseInfo: databaseInfo
            };
        case types.DELETE_DB: 
            const databaseInfo = JSON.parse(JSON.stringify(state.databaseInfo)); 
            delete databaseInfo[action.payload];
           return {
               ...state,
               databaseInfo: databaseInfo
           }
        case types.CONNECT_DB: 
            const databaseInfo = JSON.parse(JSON.stringify(state.databaseInfo));
            databaseInfo[action.payload].isConnected = true;
            return {
                ...state,
                databseInfo: databaseInfo
            }
        default: 
            return state; 
    };
};

export default dbReducer;
