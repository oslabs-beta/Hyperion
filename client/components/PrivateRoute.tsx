import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children, redirectPath='/login'} ) => {
  if (isAuthenticated === false) return (<Navigate to={redirectPath} replace />)
  else return {children}
}

export default PrivateRoute