import React from 'react';

const InstagramBtn = () => {
  const clientId = '963715064870711';
  const redirectUri = 'https://your-ngrok-url.com';

  const handleLogin = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;

    // Open the Instagram login page in a popup
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(instagramAuthUrl, 'Instagram Login', `width=${width},height=${height},top=${top},left=${left}`);

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        console.log('Popup closed');
        // Handle the case when the popup is closed
      }
    }, 1000);
  };

  return (
    <div
      onClick={handleLogin}
      style={{
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      <img src='/images/instagram.png' alt="Instagram Logo" />
    </div>
  );
};

export default InstagramBtn;
