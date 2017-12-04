// authentication helpers

// oauth clients
const clients = {
  github: 'github'
};

// oauth client IDs
const clientIds = {
  github: '8959958c36292d0b35d6'
};

// oauth URLs
const oauthBaseUrls = {
  github: 'https://github.com/login/oauth/authorize'
};

// oauth redirect URL
const oauthRedirectUri = (network) => (`http://localhost:3000/app/login/${network}`);

// generate an oauth URL for the given network
const oauthUri = (network, state) => {
  switch (network) {
    case clients.github:
      return `${oauthBaseUrls.github}?client_id=${clientIds.github}&redirect_uri=${oauthRedirectUri(network)}&state=${state}`;

    default:
      console.error('Unknown network: ' + network);
      return null;
  }
}

export default {
  clients,
  oauthUri
};
