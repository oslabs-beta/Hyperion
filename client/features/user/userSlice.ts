import { createAsyncThunk, createSlice, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// ---------------- initial state ---------------------------------------
interface UserState {
  auth: {
    isAuthenticated: boolean,
    authRequestSent: boolean,
    status: 'loaded' | 'loading'
  },
  userProfile: {
    id: number | null;
    name: string;
  }, 
  registration: {
    status: 'loaded' | 'loading'
  }
}

const initialState : UserState = {
  auth: {
    status: 'loaded',
    authRequestSent: false, 
    isAuthenticated: true ////  <------------------------------------- CHANGE BACK TO FALSEEEEE
  },
  userProfile: {
    id: null,
    name: ''
  }, 
  registration: {
    status: 'loaded'
  }
};


// -------------------- slice/reducers ----------------------------
export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    authenticateUser: (state, action: PayloadAction<boolean>) => { state.auth.isAuthenticated = true },
    authRequestSent: (state, action) => { state.auth.authRequestSent = true },
    setUserId: (state, action: PayloadAction<number>) => { state.userProfile.id = action.payload }
  }, 
  extraReducers: (builder) => {
    // login user cases
    builder.addCase(loginUser.pending, (state, action) => {
      state.auth.status = 'loading';
    })
    builder.addCase(loginUser.fulfilled, (state, action) => { 
      state.auth.status = 'loaded';
      state.auth.isAuthenticated = true; }),
    builder.addCase(loginUser.rejected, (state, action) => { 
      state.auth.status = 'loaded';
      state.auth.isAuthenticated = false;
    })
    // logout user cases 
    builder.addCase(logoutUser.fulfilled, (state, action) => { state = initialState; }), // will need to add logic to eliminate all the user data stored as well as test data 
    // register user cases
    builder.addCase(registerUser.fulfilled, (state, action) => { state.registration.status = 'loaded' }),
    builder.addCase(registerUser.rejected, (state, action) => { state.registration.status = 'loaded' }),
    builder.addCase(registerUser.pending, (state, action) => { state.registration.status = 'loading' })
  }
})

// ----------------------- thunk ----------------------------------
export const registerUser = createAsyncThunk(
  '/user/registerUser',
  async (form: { name?: string, email: string, password: string }, thunkApi) => {

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo: {
            name: form.name,
            email: form.email,
            password: form.password
          }
        })
      });
      if (response.status === 200) return 200; 
      else return 400;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

export const loginUser = createAsyncThunk(
  '/user/loginUser', 
  async (form: { email: string, password: string}, thunkApi) => {
    try {
      const response = await fetch('api/user/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          userInfo: {
            email: form.email,
            password: form.password,
          }
        })
      })
      if (response.status === 200) return thunkApi.fulfillWithValue(true);
      return thunkApi.fulfillWithValue(false);
    } catch (e) {
      console.log('Error in loginUser', e.response);
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (param, thunkApi) => {
    try {
      const data = await fetch('api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (data.status === 200) {
        return thunkApi.fulfillWithValue(true)
      }
      else return thunkApi.rejectWithValue(false);
    } catch(e) {
      console.log('Error in logoutUser', e.response)
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

export const { authenticateUser, setUserId, authRequestSent } = userSlice.actions;

export default userSlice.reducer; 