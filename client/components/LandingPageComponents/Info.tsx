import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const Info = () => { 
return (
    <section id="info">
        <h1>Hyperion</h1>
        <p>A PostgreSQL Performance Forecasting Tool</p>
        <p className="one-liner">
          An interactive tool that sumulates real-world scenarios by automatically testing
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
    </section>
)
}



    
export default Info;