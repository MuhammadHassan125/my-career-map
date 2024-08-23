import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

const FacebookBtn = () => {
  const responseFacebook = (response) => {
    console.log('Facebook login response:', response);
    
    if (response.status !== 'connected') {
      console.error('Login failed:', response.status);
      return;
    }

    const { accessToken } = response;
    console.log('Facebook access token:', accessToken);
    console.log('Facebook access token:', accessToken);    
    // Example of sending the token to your backend directly
    fetch(`${baseURL}/facebook-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Backend response:', data);
      })
      .catch(error => {
        console.error('Backend error:', error);
      });
  };

  return (
    <FacebookLogin
      appId="3646152678982030"
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <button onClick={renderProps.onClick} className='social-icon-div' style={{backgroundColor: 'white', border:'none', outline:'none'}}>
          <img src='/images/facebook.png' alt='facebook'/>
        </button>
      )}
    />
  );
};

export default FacebookBtn;
