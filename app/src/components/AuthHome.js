import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';

class AuthHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading auth message...'
    };
  }

  componentDidMount() {
    const { user } = this.props;

    api.getAuthenticatedExample(user.token).then(result => {
      this.setState({ message: result.message });
    }).catch(err => {
      this.setState({ message: 'Error getting auth message' });
    });
  }

  render () {
    const { user } = this.props;
    const { message } = this.state;

    return (
      <div>
        <h2>Authenticated Home</h2>
        <p>Hello, {user.name}!</p>
        <p>Server message: <code>{message}</code></p>
      </div>
    );
  }
}

AuthHome.propTypes = {
  user: PropTypes.object.isRequired
};

export default AuthHome;
