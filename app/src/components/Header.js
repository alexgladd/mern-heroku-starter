import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const headerLeft = {
  width: '50%',
  float: 'left'
};

const headerRight = {
  width: '50%',
  marginLeft: '50%',
  textAlign: 'right'
};

class Header extends React.Component {
  render () {
    const { user, onLogout } = this.props;

    return (
      <header>
        <div style={headerLeft}>
          <Link to="/">Home</Link>
          { user && <span> · <Link to="/profile">Profile</Link></span> }
        </div>
        <div style={headerRight}>
          { user ?
            <button onClick={() => onLogout()}>Logout</button> :
            <Link to="/login">Login</Link>
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Header;
