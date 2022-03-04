import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState : UserState = {
  auth: {
    isAuthenticated: false
  },

};

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    authenticateUser: (state, action: PayloadAction<boolean>) => { state.auth.isAuthenticated = true}
  }, 
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.auth.isAuthenticated = true;
    })
  }
})

// 

export const registerUser = createAsyncThunk(
  '/user/registerUser',
  async (form: NewUserForm, thunkApi) => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo: {
            email: form.email,
            password: form.password
          }
        })
      }) 
      // ----------------------------------- need to assume that token is beign sent back 
      const data = await response.json();
      if (data.statusCode === 200) {
        localStorage.setItem('token', data.token); 
      } else {
        return thunkApi.rejectWithValue(data);
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

export const loginUser = createAsyncThunk(
  '/user/loginUser', 
  async (form: { email: string, password: string}, thunkApi) => {
    try {
      const data = await fetch('api/user/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          userInfo: {
            email: form.email,
            password: form.password,
          }
        })
      }).then(res => res.json());
      console.log('response from loginUser', data);
      
      if (data.statusCode !== 200) {
        thunkApi.rejectWithValue('SOME ERROR MESSAGE');
      } else{ 
        // TODO ------------------------------------------------
        localStorage.setItem('token', data.token);
        return data; 
      }
    } catch (e) {
      console.log('Error in loginUser', e.response);
      thunkApi.rejectWithValue(e.response.data);
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (data, thunkApi) => {
    try {
      const data = await fetch('api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json());
      if (data.statusCode === 200) {
        localStorage.removeItem('token');
      }
      return data; 
    } catch(e) {
      console.log('Error in logoutUser', e.response)
      thunkApi.rejectWithValue(e.response.data);
    }
  }
)




interface NewUserForm {
  username: string,
  password: string,
  email: string
}

interface UserState {
  auth: AuthState
}

interface AuthState {
  isAuthenticated: boolean
}

export const { authenticateUser } = userSlice.actions;

export default userSlice.reducer; 