// api authentication routing

const { Router } = require('express');
const Auth = require('./auth');

const apiAuth = Router();

apiAuth.post('/authenticate/local', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

apiAuth.post('/authenticate/:network', (req, res) => {
  console.log('Auth request for ' + req.params.network);
  console.log(req.body);

  Auth.github.authenticate(req.body.code).then(result => {
    console.log('Got authentication result');
    console.log(result);

    res.json({ authenticated: true, name: result.name });
  }).catch(error => {
    res.status(500).json({ error: true, message: error.message });
  });
});

module.exports = apiAuth;
