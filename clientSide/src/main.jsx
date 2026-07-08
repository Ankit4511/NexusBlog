import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import State from './context/State.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <State>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </State>
  </>,
);