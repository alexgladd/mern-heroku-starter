// api authentication routing

const { Router } = require('express');

const auth = Router();

auth.post('/authenticate/local', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

auth.post('/authenticate/:network', (req, res) => {
  console.log('Auth request for ' + req.params.network);
  console.log(req.body);
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = auth;
