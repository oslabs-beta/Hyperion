import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import './assets/stylesheets/global.scss';
import App from './App';



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
