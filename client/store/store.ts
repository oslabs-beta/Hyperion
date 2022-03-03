import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slices/userSlice';


export const store = configureStore({
  reducer: {
    user: userReducer, 
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



// const initialState: DatabaseReducerState = {
//   databases : {},
// }

// const reducer = (state = initialState, action: any) => {
 
//   const databases = JSON.parse(JSON.stringify(state.databases));
  
//   switch (action.type) {
//       case types.ADD_DB:
//           databases[action.payload.id] = action.payload;
//           return {
//               ...state,
//               databases: databases
//           };
//       case types.DELETE_DB: 
//           delete databases[action.payload];
//           return {
//               ...state,
//               databases: databases
//           }
//       case types.ADD_QUERY: 
//           const {
//               databaseId, 
//               queryId, 
//               query
//           } = action.payload; 
//           databases[databaseId].queries[queryId] = { id: queryId, queryString: query };
//           return {
//              ...state, 
//              databases: databases
//           }
//       case types.DELETE_QUERY: 
//           delete databases[action.payload.databaseId].queries[action.payload.queryId];
//           return {
//               ...state, 
//               databases: databases
//           }
//       case types.RUN_TEST:
//           return {
//               ...state, 
//               databases: databases
//           }
//       // need to remove
//       default: 
//           return state; 
//   };
// };

// export default reducer;
