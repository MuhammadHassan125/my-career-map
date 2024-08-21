import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import Fire from '../../../../Fire/Fire';
import { baseURL } from '../../../../Fire/useFire';
import { Snackbar } from '../../../../Utils/SnackbarUtils';

const GoogleBtn = () => {

  
const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
    console.log(codeResponse),

    Fire.post({
        url:`${baseURL}/google-login`,
        data:{
          token: codeResponse.code
        },

        onSuccess: (res) => {
          console.log(res, "googleloginresponse");
          Snackbar(res.data.message, {variant:'success'});
        },

        onError: (err) => {
          console.log(err, "Google login error");
          Snackbar(err.error.message, {variant:'error'});
        }
    })

  },

  flow: 'auth-code'
  
});

  return (
  <button onClick={() => login()} 
  style={{backgroundColor: 'white', border:'none', outline:'none', cursor: 'pointer'}}>
    <img src='/images/google.png' alt='Google'/>
  </button>

  );
};

export default GoogleBtn;