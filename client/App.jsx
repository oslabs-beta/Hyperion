
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

const App = (props) => {

  // fetch to get cookies and authenticate  
    // if theyre authenticated we can update the database initail state


  /*
    make a fetch to the server to check if the user cookies are authenticated 
  */
  return (
    <BrowserRouter>
      <Routes>
        {/* change this to dashboard later  */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUpForm/>} />
        <Route path='dashboard' element={<Dashboard/>} /> 
        <Route path='database' element={<Databases/>} />
        <Route path='data-models' element={<DataModels/>} />
        <Route path='queries' element={<Queries/>} />
        <Route path='tests' element={<Tests/>} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App; 