import React from 'react';
import Layout from './Layout';
import Login from '../components/Login';
import { Outlet } from 'react-router-dom';
// import SignUpForm from '../components/SignUpForm';

const Dashboard = () => {
  return (
    <Layout>
      <div>
        Dashboard
      </div> 
      <Outlet />
    </Layout>
  )
}

export default Dashboard