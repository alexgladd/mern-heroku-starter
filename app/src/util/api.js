// api abstraction
// use native fetch for requests

// create consistent init objects for fetch
const buildInit = (init={}, extraHeaders={}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const headers = new Headers(Object.assign({}, defaultHeaders, extraHeaders));

  const defaultInit = {
    method: 'GET',
    headers
  };

  return Object.assign({}, defaultInit, init);
}

// api request wrapper
const apiRequest = async (path, init) => {
  try {
    const response = await fetch(path, init);
    if (response.ok) {
      return await response.json();
    } else if (response.status >= 400 && response.status <= 500) {
      const error = await response.json();
      throw error;
    } else {
      const error = { errorMessage: 'Encountered a problem communicating with the API server' };
      throw error;
    }
  } catch(err) {
    if (err.errorMessage) {
      throw err;
    } else {
      const error = { errorMessage: 'Encountered an unknown problem with the API server' };
      throw error;
    }
  }
}

// request server state
const getServerState = async () => {
  return await apiRequest('/api/serverstate', buildInit());
}

// finish oauth authentication
const oauthAuthenticate = async (network, code) => {
  const init = buildInit({
    method: 'POST',
    body: JSON.stringify({ code })
  });

  return await apiRequest(`/api/authenticate/${network}`, init);
}

export default {
  getServerState,
  oauthAuthenticate
};
