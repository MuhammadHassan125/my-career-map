import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './Utils/SnackbarUtils';
import UserProvider from './context/context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SnackbarUtilsConfigurator />
        <GoogleOAuthProvider clientId="340870224305-5gog304bjqa2maj42vt59f2ek85utv66.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </UserProvider>
)
