import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// const PrivateRoute = ({ isAuthenticated, children, redirectPath='/login'} ) => {
//   if (isAuthenticated === false) return (<Navigate to={redirectPath} replace />)
//   else return {children}
// }

const PrivateRoute = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet />: <Navigate to='/login' />
}


export default PrivateRoute