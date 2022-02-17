import React from 'react';
import { render } from 'react-dom';

import './assets/stylesheets/styles.css';
import App from './App.jsx';
import Databases from './containers/Databases';

render(
  <Databases />,
  document.getElementById('app')
);
