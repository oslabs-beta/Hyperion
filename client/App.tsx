
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from './containers/Databases';
import Dashboard from './containers/Dashboard';
import Tests from './containers/Tests';
import Queries from './containers/Queries';
import NotFound from './containers/NotFound';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';
import { authenticateUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from './features/store';
import LandingPage from './containers/LandingPage';

const App = (props) => {

  const user = useSelector((state: RootState) => { return state.user })

  // const user = useSelector((state: RootState) => state.user.auth);
  // fetch to get cookies and authenticate  
    // if theyre authenticated we can update the database initail state
  useEffect(() => {
    console.log("this useEffect is running in app")
    // runs a fetch request to server to authenticate 
    // only runs once
    if (user.auth.isAuthenticated === false && user.auth.authRequestSent === false) {
      fetch('/api/user/authenticate')
        .then(res => res.json())
        .then(data => {
          if (data.statusCode === 200) {
            authenticateUser(true);
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [])

  /*
    make a fetch to the server to check if the user cookies are authenticated 
  */
  const auth = { isAuthenticated: true }  //user.auth.isAuthenticated 
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