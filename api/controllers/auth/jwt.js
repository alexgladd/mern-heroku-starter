// wrapper for jsonwebtoken

const jwt = require('jsonwebtoken');

const generateUserToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1y' });
}

module.exports = generateUserToken;
