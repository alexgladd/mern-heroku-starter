// api server routing

const { Router } = require('express');

const api = Router();

api.get('/test', (req, res) => {
  res.json({ message: 'Hello API user!' });
});

module.exports = api;
