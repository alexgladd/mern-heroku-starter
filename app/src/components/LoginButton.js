import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import './LoginButton.css';

const LoginButton = ({name, onClick}) => {
  return (
    <button id={name} className="LoginButton" onClick={onClick}>
      <FontAwesomeIcon icon={faGithub} />
      Log in with {name.charAt(0).toUpperCase() + name.slice(1)}
    </button>
  );
}

LoginButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default LoginButton;
