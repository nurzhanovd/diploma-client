import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import 'normalize.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import 'core/styles/colors.scss';

import 'bootstrap-4-grid/css/grid.min.css';

import 'core/styles/default.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
