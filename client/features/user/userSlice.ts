import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState : UserState = {
  isAuthenticated: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {

  }
})

// 

export const registerUser = createAsyncThunk(
  '/user/registerUser',
  async (form: NewUserForm, thunkApi) => {
    const data = await fetch('/api/user/register', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInfo: {
          email: form.email,
          password: form.password
        }
      })
    }).then(res => res.json());
    if (data.statusCode !== 200) {
      thunkApi.rejectWithValue('SOME ERROR MESSAGE HERE ')
    } else {
      return data;
    }
  }
)

export const loginUser = createAsyncThunk(
  '/user/loginUser', 
  async (form: { email: string, password: string}, thunkApi) => {
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
    if (data.statusCode !== 200) {
      thunkApi.rejectWithValue('SOME ERROR MESSAGE');
    } else{ 
      // TODO ------------------------------------------------
      localStorage.setItem('jwt', 'INSERT JWT FROM SERVER HERE');
      return data; 
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    const data = await fetch('api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
    return data; 
  }
)

export const authUser = createAsyncThunk(
  'user/authenticate',
  async () => {
    return 'TODO';
  }
)



interface NewUserForm {
  username: string,
  password: string,
  email: string
}

interface UserState {
  isAuthenticated: boolean,
}

export const {} = userSlice.actions;

export default userSlice.reducer; 