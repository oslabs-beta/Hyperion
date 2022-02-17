import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './assets/stylesheets/styles.css';
import App from './App.jsx';
import Databases from './containers/Databases';

render(
  <Provider store = {store}><App/></Provider>,
  document.getElementById('app')
);
