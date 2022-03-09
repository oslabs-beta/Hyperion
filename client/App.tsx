import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Databases from './containers/Databases';
import Dashboard from './containers/Dashboard';
import Tests from './containers/Tests';
import Queries from './containers/Queries';
import NotFound from './containers/NotFound';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';
import { authenticateUser, setUserId, authRequestSent } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from './features/store';
import LandingPage from './containers/LandingPage';
import { useNavigate } from 'react-router-dom';
import { fetchExistingData } from './features/data/dataSlice';

const App = () => {
  
  const user = useSelector((state: RootState) => { return state.user });


  useEffect(() => {
    if (user.auth.isAuthenticated === true) {
      fetchExistingData();
    }
  }, [])

  const auth = { isAuthenticated: user.auth.isAuthenticated } 
 
  return (
    <BrowserRouter>
      <Routes>
        {/* change this to dashboard later  */}
        <Route path='/' element={<LandingPage/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<SignUpForm/>} />
        <Route path='about' element={<div>About</div>} />
        {/* TRY TO MAKE THE PRIVATE ROUTES NESTED WITHIN AN /APP ENDPOINT */}
        <Route element={<PrivateRoute auth={auth}/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='queries' element={<Queries/>}/>
          <Route path='tests' element={<Tests/>}/>
          <Route path='database' element={<Databases/>}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 