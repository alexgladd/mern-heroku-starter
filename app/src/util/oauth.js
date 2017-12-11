// authentication helpers

import build from './build';

// oauth clients
const clients = {
  github: 'github'
};

// oauth client IDs
const clientIds = {
  github: (build.prod ? '5eb101fbdbdd9ce15d8f' : '8959958c36292d0b35d6')
};

// oauth URLs
const oauthBaseUrls = {
  github: 'https://github.com/login/oauth/authorize'
};

// oauth redirect URL
const redirectBase = (build.prod ? 'https://mern-app-starter.herokuapp.com' : 'http://localhost:3000');
const oauthRedirectUrl = (network) => (`${redirectBase}/login/${network}`);

// generate an oauth URL for the given network
const oauthUrl = (network, state) => {
  switch (network) {
    case clients.github:
      return `${oauthBaseUrls.github}?client_id=${clientIds.github}&redirect_uri=${oauthRedirectUrl(network)}&state=${state}`;

    default:
      console.error('Unknown network: ' + network);
      return null;
  }
}

export default {
  clients,
  oauthUrl
};
