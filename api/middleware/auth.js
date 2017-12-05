// authentication middleware

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// verify the user through their provided authentication token
exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // set authPayload on the request object for later use
    req.authPayload = payload;
    next();
  } catch(err) {
    console.error(`Authentication error: ${err.message}`, err);
    res.status(401).json({ errorMessage: 'Authentication required' });
  }
}

// verify the user is allowed to access a resource
// expects request params to have a userId
exports.authorizeUser = (req, res, next) => {
  if (req.params.userId && req.params.userId === req.authPayload.user.id) {
    User.findById(req.authPayload.user.id).then(user => {
      if (user) {
        // set authUser on the request object for later use
        req.authUser = user;
        next();
      } else {
        res.status(401).json({ errorMessage: 'Not authorized' });
      }
    }).catch(err => {
      console.error('Authorization error', err);
      res.status(401).json({ errorMessage: 'Not authorized' });
    });
  } else {
    res.status(401).json({ errorMessage: 'Not authorized' });
  }
}
