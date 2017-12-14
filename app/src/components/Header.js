import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render () {
    const { user, onLogout } = this.props;

    return (
      <header>
        <div className="HeaderLeft">
          <Link to="/">Home</Link>
          { user && <span> · <Link to="/profile">Profile</Link></span> }
        </div>
        <div className="HeaderRight">
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
