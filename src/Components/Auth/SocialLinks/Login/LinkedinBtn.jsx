import React, { useState } from 'react'
import { LinkedIn } from 'react-linkedin-login-oauth2';

const LinkedinBtn = () => {
  return (
    <LinkedIn
      clientId="77xgzu666vbrij"
      redirectUri={`http://localhost:5173`}
      onSuccess={(code) => {
        console.log(code);
      }}
      onError={(error) => {
        console.log(error);
      }}
    >
      {({ linkedInLogin }) => (
        <img
          onClick={linkedInLogin}
          src={'/images/linkedin.png'}
          alt="Sign in with Linked In"
          style={{ maxWidth: '180px', cursor: 'pointer' }}
        />
      )}
    </LinkedIn>
  )
}

export default LinkedinBtn