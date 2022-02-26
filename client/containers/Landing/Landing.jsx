import React from 'react'
import HorizontalNavBar from '../../components/HorizontalNavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from '../About';
import Login from '../Login';
import Register from '../Register.jsx';
import NotFound from '../NotFound';

const Landing = () => {
  return (
    <BrowserRouter>
      <HorizontalNavBar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default Landing