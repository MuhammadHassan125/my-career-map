import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Snackbar } from '../../../../Utils/SnackbarUtils'; // Adjust the path as needed

const GoogleBtn = () => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log('Authorization Code:', codeResponse.code);

      try {
        // Send the authorization code to the backend
        const response = await axios.post('http://192.168.18.194:8001/api/google-login', {
          code: codeResponse.code
        });

        console.log('Backend Response:', response.data);

        // Optionally, handle the backend response (e.g., store JWT token, user info, etc.)
        Snackbar('Google login successful. You are logged in.', { variant: 'success' });
      } catch (error) {
        console.error('Error sending authorization code to backend:', error);
        Snackbar('Google login failed. Please try again.', { variant: 'error' });
      }
    },
    onError: (errorResponse) => {
      console.error('Google OAuth error:', errorResponse);
      Snackbar('Google login failed. Please try again.', { variant: 'error' });
    },
    flow: 'auth-code',
  });

  return (
    <button onClick={() => login()} style={{ backgroundColor: 'white', border: 'none', outline: 'none', cursor: 'pointer' }}>
      <img src='/images/google.png' alt='Google' />
    </button>
  );
};

export default GoogleBtn;
