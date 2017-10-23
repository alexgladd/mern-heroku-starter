// implement github oauth flow
const fetch = require('node-fetch');

const ghHeaders = () => ({ 'Accept': 'application/json' });

const ghConfig = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
};

const authenticate = (code) => {
  return getAccessToken(code).then((tokenData) => {
    if (tokenData && tokenData.access_token) {
      return getProfile(tokenData.access_token);
    } else {
      return new Promise((resolve, reject) => {
        resolve({ error: 'Could not get access token' });
      });
    }
  });
}

const getAccessToken = (code) => {
  const init = {
    method: 'POST',
    headers: ghHeaders()
  };

  return fetch(`https://github.com/login/oauth/access_token?client_id=${ghConfig.id}&client_secret=${ghConfig.secret}&code=${code}`, init).then((response) => {
    return response.json();
  });
}

const getProfile = (accessToken) => {
  const headers = Object.assign({}, ghHeaders(), { 'Authorization': `token ${accessToken}` });
  const init = { headers };

  return fetch('https://api.github.com/user', init).then(response => response.json());
}

module.exports = { authenticate };
