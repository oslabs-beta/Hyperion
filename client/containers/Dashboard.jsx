import React from 'react';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
import Features from '../components/LandingPageComponents/Features';
// import SignUpForm from '../components/SignUpForm';

const Dashboard = () => {
  return (
      <div>
      <HorizontalNavBar></HorizontalNavBar>
      <Info></Info>
      <Features></Features>
      <Team></Team>
      </div> 
  )
}

export default Dashboard