import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'normalize.css';
import './index.css';
import App from './components/App';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/react-mesto-auth' : '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('.page')
);

reportWebVitals();
