import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading profile message...'
    };
  }

  componentDidMount() {
    const { user } = this.props;

    api.getAuthorizedExample(user).then(result => {
      this.setState({ message: result.message });
    }).catch(err => {
      this.setState({ message: 'Error getting profile message' });
    });
  }

  render () {
    const { user } = this.props;
    const { message } = this.state;

    let network = 'Unknown';
    if (user.github.avatarUrl) {
      network = 'Github';
    } else if (user.facebook.avatarUrl) {
      network = 'Facebook';
    }

    return (
      <div>
        <h2>Profile</h2>
        <ul>
          <li><strong>User name:</strong> {user.name}</li>
          <li><strong>Network:</strong> {network}</li>
        </ul>
        <p>Profile message: <code>{message}</code></p>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;
