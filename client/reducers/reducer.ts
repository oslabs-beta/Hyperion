import * as types from '../constants/actionTypes';
import Database from '../models/database';
import { Query } from '../models/database';
// const initialState = { 

//     databases: {},
//     /*
//     {
//         id: {
//             id: Number, 
//             port: Number,
//             database: String (database name referred to by postgres),
//             name: String (database name provided by user),
//             sslMode: String 
//             user: String,
//             isConnected: Boolean, 
//             queries: {
//                 queryId: {

//                 },
//                 ...
//             }, 
//             tables : {
//                 tableId: {
//                     name: String,
//                     attributes:[] of {
//                         attribute: String, 
//                         datatypeId:  
//                     }
//                 },
//                 ...
//             }
//         }, 
//         ... 
//     }
//     */

// };

const createTestDatabases = () => {
    const databases : { [id: number] : Database } = {};
    for (let i = 0; i < 5; i++) {
        databases[i] = new Database(i, Math.floor(Math.random()*1000), 'pgDatabaseName', 'label' + i, 'sslMode', 'user', false);
    }
    return databases
}

// id: Number, port: Number, pgDatabaseName: String, label: String, sslMode: String, user: String, isConnected: Boolean
const initialState = {
    databases: createTestDatabases(),
}

const reducer = (state = initialState, action: any) => {
   
    const databases = JSON.parse(JSON.stringify(state.databases));
    
    console.log(' state in reducer', state);
    switch (action.type) {
        case types.ADD_DB:
            databases[action.payload.id] = action.payload;
            return {
                ...state,
                databases: databases
            };
        case types.DELETE_DB: 
           delete databases[action.payload];
           return {
               ...state,
               databases: databases
           }
        case types.ADD_QUERY: 
           databases[action.payload.id] = { id: action.payload.id, queryString: action.payload.query };
           return {
               ...state, 
               databases: databases
           }
        // need to remove
        default: 
            return state; 
    };
    // return state; // remove later
};

export default reducer;
