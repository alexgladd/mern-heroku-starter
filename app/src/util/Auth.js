// authentication helpers

const oauthBaseUrls = {
  github: 'https://github.com/login/oauth/authorize'
};

const oauthRedirectUri = (network) => (`http://localhost:3000/app/login/${network}`);

const oauthUri = (network, clientId) => {
  switch (network) {
    case 'github':
      return `${oauthBaseUrls.github}?client_id=${clientId}&redirect_uri=${oauthRedirectUri(network)}`;

    default:
      console.error('Unknown network: ' + network);
      return null;
  }
}

export default {
  oauthUri
};
