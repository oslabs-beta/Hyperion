import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet />: <Navigate to='/login' />
}


export default PrivateRoute