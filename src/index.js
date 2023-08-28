import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/veriables.scss";
import "./style/reset.scss";
import "./style/global.scss";
import 'react-toastify/dist/ReactToastify.css';
import { RandomPassword } from './components/randomPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RandomPassword/>
  </React.StrictMode>
);

