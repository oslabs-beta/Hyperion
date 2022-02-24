import { combineReducers } from 'redux';

// import all reducers here
import reducer from './reducer';
// combine reducers
const reducers = combineReducers({
    // list all reducers here
    app: reducer, 
});

// make the combined reducers available for import
export default reducers;