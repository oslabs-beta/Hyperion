import * as types from '../constants/actionTypes';
import { addDatabse } from '../actions/actions.js';


const initialState = { 
userId: null, 
lastDbId: null,
databaseList: [{name:. connection: }]
schemaList: [], 
queryList: [],
};

const dbReducer = (state = initialState, action) => {
   
    const copyState = {...state};
    switch (action.type) {
        case types.ADD_DB:
        const newDatabaseList = state.databaseList.slice()
        if (!state.databaseList.includes(action.payload)) newDatabaseList.push(action.payload);
        return {
            ...copyState,
            databaseList: newDatabaseList,
        }

        case types.DELETE_DB:
        const newDatabaseList = state.databaseList.slice()
        for (let el of newDatabaseList) {
            if (el.dbId === action.payload) { 
                //splice(start, deleteCount)
                newDatabaseList.splice(newDatabaseList.indexOf(el), 1)
            }
        }
        return {
            ...copyState,
            databaseList: newDatabaseList,
        };
        case types.CONNECT_DB: 
        return {
            ...copyState,
        };
        default: {
            return state; 
        }
    };
};

//Thunk Function

export const fetchDbs = () => {
    return (dispatch, getState) => {
      fetch('api/db/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
        .then((data) => data.json())
        .then(db => { 
            db.isConnected = true
            dispatch ({
                type: types.ADD_DB, 
                payload: db
            })
        })
            
    }} 


export default dbReducer;