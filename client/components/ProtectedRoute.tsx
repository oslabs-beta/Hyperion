import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ auth: {isAuthenticated}, children}) => {
  return (
    isAuthenticated ? children: <Navigate to='/login' />
  )
}

export default ProtectedRoute