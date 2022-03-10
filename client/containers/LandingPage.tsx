import React from 'react';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
import Features from '../components/LandingPageComponents/Features';

const LandingPage = (props) => {
  return (
    <div className='landing-container'>
      <HorizontalNavBar />
      <Info />
      <Features />
      <Team />
    </div>
  )
}

export default LandingPage