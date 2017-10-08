import React from 'react';
import { Redirect } from 'react-router';
import Auth from '../util/Auth';
import QueryString from 'query-string';

const auth = {
  github: '8959958c36292d0b35d6'
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false };
  }

  handleLoginClick() {
    console.log('Logging in with github...');
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${auth.github}`
  }

  componentDidMount() {
    console.log('Login mounted');

    const query = QueryString.parse(this.props.location.search);
    if (query.code) {
      // start authentication
      Auth.oauthAuthenticate('github', query.code).then((result) => {
        console.log('Got auth data');
        console.log(result);

        if (result.authenticated) {
          this.setState({ authenticated: true });
        }
      }).catch((error) => {
        console.log('Auth failure: ' + error.message);
      });
    }

    // look for 'code' query param
    // use URLSearchParams or the query-string package
    // post code to our server to authenticate with github and issue a jwt token
    // back to the client if successful
    // https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/
  }

  render () {
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <h2>Login</h2>
          <p>Click below to log in with Github!</p>
          <button className="zocial github" onClick={this.handleLoginClick}>
            Log in with Github
          </button>
        </div>
      );
    }
  }
}

export default Login;
