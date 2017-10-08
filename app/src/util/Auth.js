// authentication helpers

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
  oauthAuthenticate
};
