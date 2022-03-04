import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Team = () => {
    const teamProfile = [
      {
        name: 'Celene Chang',
        github: 'https://www.github.com/celenecchang',
        linkedIn: 'https://www.linkedin.com/in/celenecchang/',
        src: './assets/teampictures/Celene-Chang.jpeg',
      },
      {
        name: 'Sankari Ayyaluru',
        github: 'http://github.com/SankariAri',
        linkedIn: 'https://www.linkedin.com/in/sankari-ayyaluru/',
        src: './assets/teampictures/Sankari-Ayyaluru.jpeg',
      },
      {
        name: 'Nick Ozawa',
        github: 'https://github.com/NAustinO',
        linkedIn: 'https://www.linkedin.com/in/nicholas-ozawa/',
        src: './assets/teampictures/Nick-Ozawa.jpeg',
      },
      {
        name: 'Chloe Angel',
        github: 'https://github.com/chloeangl',
        linkedIn: 'https://www.linkedin.com/in/chloeangl/',
        src: './assets/teampictures/Chloe-Angel.jpeg',
      },
     
    ];

 
    const profiles = teamProfile.map((profile) => {
        return (
          <React.Fragment key={profile.name}>
            <div className="teamProfile">
                 <span>
                  <img
                    src={profile.src}
                    alt={profile.name}
                    className="actual-pic"
                  ></img>
                </span>
        
              <div className="team-profile-title">
                <h4>{profile.name}</h4>
              </div>
              <div className="team-links">
                <a href={profile.github} target="Blank">
                  < FontAwesomeIcon icon={faGithub} size="3x" color="#e0e9f1" />
                </a>
                <a href={profile.linkedIn} target="Blank">
                  <FontAwesomeIcon icon={faLinkedin}size="3x" color="#e0e9f1" />
                </a>
              </div>
            </div>
          </React.Fragment>
        );
      });
    
      return (
        <div className="team-wrapper">
          <h1 id="team">Meet The Team</h1>
          <div className="team-container">{profiles}</div>git
        </div>
      );
    };

    export default Team;