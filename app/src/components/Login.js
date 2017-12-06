import React from 'react';
import { Redirect } from 'react-router';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import { oauthAuthenticate } from '../actions/user';
import oauth from '../util/oauth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleGithubLogin = this.handleGithubLogin.bind(this);
  }

  handleGithubLogin() {
    const { serverState } = this.props;
    // redirect to github oauth page
    window.location.href = oauth.oauthUri(oauth.clients.github, serverState.random);
  }

  componentDidMount() {
    const { location, match, finishOauth } = this.props;

    const query = QueryString.parse(location.search);
    if (query.code && match.params.network) {
      // finish oauth authentication
      finishOauth(match.params.network, query.code);
    }
  }

  render () {
    const { user } = this.props;

    if (user) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <h2>Login</h2>
          <p>Click below to log in with Github!</p>
          <button className="zocial github" onClick={this.handleGithubLogin}>
            Log in with Github
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  serverState: state.serverState
});

const mapDispatchToProps = (dispatch) => ({
  finishOauth(network, code) { dispatch(oauthAuthenticate(network, code)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
