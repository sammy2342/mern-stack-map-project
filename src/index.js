import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { StateContext } from './context/StateContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StateContext>
        <Toaster />
        <App />
      </StateContext>
    </Router>
  </React.StrictMode>
);


