// api server routing

const express = require('express');

const api = express.Router();

api.get('/test', (req, res) => {
  res.json({ message: 'Hello API user!' });
});

module.exports = api;
