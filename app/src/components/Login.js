import React from 'react';
import { Redirect } from 'react-router';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import { oauthAuthorized, authenticated } from '../actions/auth';
import Auth from '../util/Auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOauth: (network, code) => { dispatch(oauthAuthorized(network, code)); },
    onAuthenticated: (token) => { dispatch(authenticated(token)); }
  };
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    console.log('Logging in with github...');
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.props.auth.github.clientId}`
  }

  componentDidMount() {
    console.log('Login mounted');

    const query = QueryString.parse(this.props.location.search);
    if (query.code) {
      // update state
      this.props.onOauth('github', query.code);
    }

    // look for 'code' query param
    // use URLSearchParams or the query-string package
    // post code to our server to authenticate with github and issue a jwt token
    // back to the client if successful
    // https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.auth.authenticated && this.props.auth.github.code) {
      // start authentication
      Auth.oauthAuthenticate('github', this.props.auth.github.code).then((result) => {
        console.log('Got auth data');
        console.log(result);

        if (result.authenticated) {
          this.props.onAuthenticated('faketoken');
        }
      }).catch((error) => {
        console.log('Auth failure: ' + error.message);
      });
    }
  }

  render () {
    if (this.props.auth.authenticated) {
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

const ReduxLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ReduxLogin;
