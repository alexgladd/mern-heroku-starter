import React from 'react';
import { Redirect } from 'react-router';
import QueryString from 'query-string';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { oauthAuthenticate } from '../actions/user';
import oauth from '../util/oauth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oauthButtons: [
        oauth.clients.github
      ]
    };

    this.handleOauthLogin = this.handleOauthLogin.bind(this);
    this.renderLoginButtons = this.renderLoginButtons.bind(this);
  }

  handleOauthLogin(network) {
    const { serverState } = this.props;
    // redirect to network's oauth page
    window.location.href = oauth.oauthUrl(network, serverState.random);
  }

  componentDidMount() {
    const { location, match, finishOauth } = this.props;

    const query = QueryString.parse(location.search);
    if (query.code && match.params.network) {
      // finish oauth authentication
      finishOauth(match.params.network, query.code);
    }
  }

  renderLoginButtons() {
    const { oauthButtons } = this.state;

    return oauthButtons.map((network, idx) => {
      return (
        <LoginButton name={network} onClick={() => this.handleOauthLogin(network)} key={idx}/>
      );
    });
  }

  render() {
    const { user } = this.props;

    if (user) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <h2>Login</h2>
          <p>Click below to log in with your preferred network!</p>
          { this.renderLoginButtons() }
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
