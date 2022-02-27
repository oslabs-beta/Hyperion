
import * as types from '../actions/actionTypes';
import Database from '../models/database';
import { Query } from '../models/database';

// const createTestDatabases = () => {
//     const databases : { [id: number] : Database } = {};
//     for (let i = 0; i < 5; i++) {
//         databases[i] = new Database(i, Math.floor(Math.random()*1000), 'pgDatabaseName', 'label' + i, 'sslMode', 'user', false);
//     }
//     return databases
// }

const initialState = {
    databases: {}, // createTestDatabases() will be empty object when linking back and frontend
}

const reducer = (state = initialState, action: any) => {
   
    const databases = JSON.parse(JSON.stringify(state.databases));
    
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
            const {
                databaseId, 
                queryId, 
                query
            } = action.payload; 
            databases[databaseId].queries[queryId] = { id: queryId, queryString: query };
            return {
               ...state, 
               databases: databases
            }
        case types.DELETE_QUERY: 
            delete databases[action.payload.databaseId].queries[action.payload.queryId];
            return {
                ...state, 
                databases: databases
            }
        case types.RUN_TEST:
            return {
                ...state, 
                databases: databases
            }
        // need to remove
        default: 
            return state; 
    };
};

export default reducer;
