import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: "1ce1e5f88a4142a48341ed824c0bcf01",
    redirectUri: window.location.origin,
    authority: "https://login.microsoftonline.com/{your_tenant_id}"
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

const OutlookBtn = () => {
  const [msal, setMsal] = useState(null);

  useEffect(() => {
    setMsal(msalInstance);
  }, []);

  const handleLogin = async () => {
    if (!msal) {
      console.error('MSAL instance is not initialized.');
      return;
    }

    try {
      const loginResponse = await msal.loginPopup({
        scopes: ["https://graph.microsoft.com/.default"]
      });
      const accessToken = await loginResponse.accessToken;

      // Send accessToken to your backend
      const response = await fetch('http://localhost:4000/api/outlook-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      });
      const data = await response.json();
      console.log('Login successful', data);
    } catch (error) {
      console.error('Outlook Login Error:', error.message);
    }
  };

  return (
    <button onClick={handleLogin}
      style={{ border: "none", outline: "none", backgroundColor: "transparent" }}
    >
      <img src="/images/outlook.png" alt="Outlook Login" />
    </button>
  );
};

export default OutlookBtn;
