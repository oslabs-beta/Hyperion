
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from './containers/Databases';
import Dashboard from './containers/Dashboard';
import DataModels from './containers/DataModels';
import Tests from './containers/Tests';
import Queries from './containers/Queries';
import NotFound from './containers/NotFound';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';

const App = (props) => {

  // fetch to get cookies and authenticate  
    // if theyre authenticated we can update the database initail state

  const isAuthenticated = false; 
  /*
    make a fetch to the server to check if the user cookies are authenticated 
  */
  return (
    <BrowserRouter>
      <Routes>
        {/* change this to dashboard later  */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<SignUpForm/>} />
        {/* <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='queries' element={<Queries/>}/>
          <Route path='tests' element={<Tests/>}/>
          <Route path='database' element={<Databases/>}/>
          <Route path='data-models' element={<DataModels/>}/>
        </Route>
        {/* <Route path='dashboard'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        <Route path='database' 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Databases/>
            </PrivateRoute>
          }
        />
        <Route path='data-models' 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DataModels/>
            </PrivateRoute>
          }
        />
        <Route path='queries' 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DataModels/>
            </PrivateRoute>
          }
        />
        <Route path='tests' 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Tests/>
            </PrivateRoute>
          }
        /> */}
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}


/*

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
*/



export default App; 