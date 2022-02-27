import { combineReducers } from 'redux';
// import all reducers here
import reducer from './reducer';
import userReducer from './user';


// combine reducers
const reducers = combineReducers({
    // list all reducers here
    app: reducer, 
    user: userReducer
});

// make the combined reducers available for import
export default reducers;