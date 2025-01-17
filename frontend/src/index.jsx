import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import './assets/css/index.css';
import App from './pages';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const WithHotReload = process.env.NODE_ENV === 'development' ? hot(App) : App;

ReactDOM.render(
  <React.StrictMode>
    <WithHotReload />
  </React.StrictMode>,
  document.getElementById('root'),
);
