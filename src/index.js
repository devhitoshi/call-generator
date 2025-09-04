import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import { SongProvider } from './contexts/SongContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SongProvider>
      <App />
    </SongProvider>
  </React.StrictMode>
);
