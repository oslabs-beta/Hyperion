
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from './containers/Databases';
import Dashboard from './containers/Dashboard';
import Schemas from './containers/Schemas';
import Tests from './containers/Tests';
import Queries from './containers/Queries';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* change this to dashboard later  */}
        <Route path='/' element={<Databases/>} /> 
        <Route path='/dashboard' element={<Dashboard/>} /> 
        <Route path='/database' element={<Databases/>} />
        <Route path='/schemas' element={<Schemas/>} />
        <Route path='/queries' element={<Queries/>} />
        <Route path='/tests' element={<Tests/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 