import React from 'react';
import logo from '../../assets/images/Icon.png'

const Info = () => { 
  return (
    <section id="info">
      <div>
        <h1>Hyperion</h1>
        <p>A PostgreSQL Performance Testing Tool</p>
        <p className="description">
          An interactive tool that tests PostgresSQL query runtime.
        </p>
      </div>
      <img className= 'logo' src={logo} alt="hyperion-logo" />
    </section>
  )
}

    
export default Info;