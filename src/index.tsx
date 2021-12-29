import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { attachLogger } from 'effector-logger/attach';
import { domain } from 'efx-forms/utils';
import { App } from './App';

import './index.css';

attachLogger(domain, {
  console: 'disabled',
  inspector: 'disabled',
  reduxDevtools: 'enabled',
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
