// api abstraction
// use native fetch for requests

import { buildInit, buildAuthInit, apiRequest } from './apihelpers';

// request server state
const getServerState = async () => {
  return await apiRequest('/api/serverstate', buildInit());
}

// finish oauth authentication
const oauthAuthenticate = async (network, code, extras) => {
  let body = {
    code
  };

  if (extras) {
    body = { ...body, ...extras };
  }

  const init = buildInit({
    method: 'POST',
    body: JSON.stringify(body)
  });

  return await apiRequest(`/api/authenticate/${network}`, init);
}

// example api endpoints (remove)
const getAuthenticatedExample = async (token) => {
  return await apiRequest('/api/example', buildAuthInit(token));
}

const getAuthorizedExample = async (user) => {
  return await apiRequest(`/api/user/${user.id}/example`, buildAuthInit(user.token));
}
// example api endpoints (remove)

export default {
  getServerState,
  oauthAuthenticate,
  getAuthenticatedExample,
  getAuthorizedExample
};
