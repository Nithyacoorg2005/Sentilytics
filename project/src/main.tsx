// File: /src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '../src/context/authContext.tsx' // Import the provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with the provider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);