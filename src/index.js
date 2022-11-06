import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './css/index.css';
import './css/button.css';
import './css/modal.css';
import './css/popup.css';
import './css/list.css';
import './css/card.css';
import './css/checklist.css'
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
