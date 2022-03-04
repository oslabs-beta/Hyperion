import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo.jpg'
const Info = () => { 
return (
    <section id="info">
        <div>
        <h1>Hyperion</h1>
        <p>A PostgreSQL Performance Forecasting Tool</p>
        <p className="description">
          An interactive tool that simulates real-world scenarios by automatically testing
          at various scales using dynamically-generated queries.
        </p>
        <div className="button-wrapper">
          <button>
            <FontAwesomeIcon icon={faGithub} />
            <a
              href="https://github.com/oslabs-beta/hyperion"
            >
              Github
            </a>
            </button>
            </div>
            </div>
            <img
        src={logo}
        alt="hyperion-logo"
      />
    </section>
)
}



    
export default Info;