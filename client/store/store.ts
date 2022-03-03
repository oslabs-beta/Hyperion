import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slices/userSlice';
import dataReducer from '../store/slices/dataSlice';
import testReducer from '../store/slices/testSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, 
    data: dataReducer,
    test: testReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


