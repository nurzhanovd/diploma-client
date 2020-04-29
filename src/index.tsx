import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import 'normalize.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'core/styles/normalize.local.scss';

import 'bootstrap-4-grid/css/grid.min.css';

import '@blueprintjs/core/lib/css/blueprint.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
