// api request helpers

// create consistent init objects for fetch
export const buildInit = (init={}, extraHeaders={}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const headers = new Headers({ ...defaultHeaders, ...extraHeaders });

  const defaultInit = {
    method: 'GET',
    headers
  };

  return { ...defaultInit, ...init };
}

// create an init object for authenticated requests
export const buildAuthInit = (token, init={}, extraHeaders={}) => {
  const authHdr = { 'Authorization': `Bearer ${token}` };

  return buildInit(init, { ...authHdr, ...extraHeaders });
}

// api request wrapper
export const apiRequest = async (path, init) => {
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
