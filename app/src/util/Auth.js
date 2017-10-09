// authentication helpers

const oauthBaseUrls = {
  github: 'https://github.com/login/oauth/authorize'
};

const oauthRedirectUri = network => (`http://localhost:3000/app/login/${network}`);

const oauthUri = (network, clientId) => {
  switch (network) {
    case 'github':
      return `${oauthBaseUrls.github}?client_id=${clientId}&redirect_uri=${oauthRedirectUri(network)}`;

    default:
      console.error('Unknown network: ' + network);
      return null;
  }
}

const unprotectedHeaders = () => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return headers;
}

const oauthAuthenticate = (network, code) => {
  const body = {
    code
  };

  const init = {
    method: 'POST',
    headers: unprotectedHeaders(),
    body: JSON.stringify(body)
  };

  return fetch(`/api/authenticate/${network}`, init).then((response) => response.json());
}

export default {
  oauthUri,
  oauthAuthenticate
};
