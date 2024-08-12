import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="724896608785-4bujbfo5qlolkherlm858lum6hbo3ubg.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
