import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import cc from '../../assets/teampictures/cc.jpg'
import sa from '../../assets/teampictures/sa.jpg'
import ca from '../../assets/teampictures/ca.jpg'
import no from '../../assets/teampictures/no.jpg'

const Team = () => {
  const teamProfile = [
    {
      name: 'Sankari Ayyaluru',
      github: 'http://github.com/SankariAri',
      linkedIn: 'https://www.linkedin.com/in/sankari-ayyaluru/',
      src: sa,
    },
    {
      name: 'Nick Ozawa',
      github: 'https://github.com/NAustinO',
      linkedIn: 'https://www.linkedin.com/in/nicholas-ozawa/',
      src: no,
    },
    {
      name: 'Chloe Angel',
      github: 'https://github.com/chloeangl',
      linkedIn: 'https://www.linkedin.com/in/chloeangl/',
      src: ca,
    },
    {
      name: 'Celene Chang',
      github: 'https://www.github.com/celenecchang',
      linkedIn: 'https://www.linkedin.com/in/celenecchang/',
      src: cc,
    },
  ];
 
  const profiles = teamProfile.map((profile) => {
    return (
      <React.Fragment key={profile.name}>
        <div className="teamProfile">
          <span>
            <img
              src={profile.src}
              // alt={profile.name}
              // className="actual-pic"
            />
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
      <h1 id="team">Team</h1>
      <div className="team-container">{profiles}</div>
    </div>
  );
};


export default Team;