import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub/*, faFacebook, faGoogle*/ } from '@fortawesome/fontawesome-free-brands';
import { faArrowAltCircleRight } from '@fortawesome/fontawesome-free-solid';
import oauth from '../util/oauth';
import './LoginButton.css';

const LoginButton = ({name, onClick}) => {
  let icon;
  switch (name) {
    case oauth.clients.github:
      icon = faGithub;
      break;

    // case 'facebook':
    //   icon = faFacebook;
    //   break;
    //
    // case 'google':
    //   icon = faGoogle;
    //   break;

    default:
      icon = faArrowAltCircleRight;
  }

  return (
    <button id={name} className="LoginButton" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      Log in with {name.charAt(0).toUpperCase() + name.slice(1)}
    </button>
  );
}

LoginButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default LoginButton;
