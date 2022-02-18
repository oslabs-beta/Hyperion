import { combineReducers } from 'redux';

// import all reducers here
import dbReducer from './dbReducer';
// combine reducers
const reducers = combineReducers({
    // list all reducers here
    db: dbReducer, 
});

// make the combined reducers available for import
export default reducers;