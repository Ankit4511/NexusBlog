import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import State from "./context/State.jsx";import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <State>
      <Router>
        <App />
      </Router>
    </State>
  </React.StrictMode>,
);
