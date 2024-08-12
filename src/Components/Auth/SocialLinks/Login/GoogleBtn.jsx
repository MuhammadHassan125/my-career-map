import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleBtn = () => {

  
const login = useGoogleLogin({
  onSuccess: codeResponse => console.log(codeResponse),
  flow: 'auth-code',
});

  return (
  <button onClick={() => login()} style={{backgroundColor: 'white', border:'none', outline:'none', cursor: 'pointer'}}>
    <img src='/images/google.png' alt='Google'/>
  </button>

  );
};

export default GoogleBtn;