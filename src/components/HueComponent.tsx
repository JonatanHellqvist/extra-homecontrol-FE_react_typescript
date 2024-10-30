import React, { useEffect, useState } from 'react';

const HueComponent: React.FC = () => {
//   const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Hantera Hue-autentisering
  const handleHueAuth = () => {
	const clientId = import.meta.env.VITE_HUE_CLIENT_ID;
	const redirectUri = encodeURIComponent('https://starfish-app-a5j77.ondigitalocean.app/user'); //registerad URI på hue
	const state = 'random_string';
  
	const authUrl = `https://api.meethue.com/v2/oauth2/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}`;
	
	console.log("Redirecting to:", authUrl);
	window.location.href = authUrl; // Redirect user for authentication
  };
  useEffect(() => {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
  
	if (code) {
	  fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/hue/callback?code=${code}`, {
		method: 'GET',
	  })
	  .then(response => {
		if (!response.ok) {
		  throw new Error(`Error, response not ok: ${response.status} ${response.statusText}`);
		}
		return response.json();
	  })
	  .then(data => {
		console.log('Token response:', data); 
		if (data.access_token) {
		  localStorage.setItem('access_token', data.access_token);
		  localStorage.setItem('username', data.username);
		  console.log("Access Token:", localStorage.getItem('access_token'));
		  console.log("Username:", localStorage.getItem('username'));
		} else {
		  throw new Error('Access token is missing in response');
		}
	  })
	  .catch(err => {
		console.error('Error during authentication:', err);
		setError(err.message); 
	  });
	}
  }, []);


  return (
    <div id= "AuthDiv">
      <h1>Authenticate Hue Bridge</h1>
	  {error && <p>Error: {error}</p>}
      <button onClick={handleHueAuth}>Authenticate with Philips Hue</button>
    </div>
  );
};

export default HueComponent;