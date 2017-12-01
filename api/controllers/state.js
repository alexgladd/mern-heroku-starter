// server state controllers

const state = require('../state');

exports.serverState = (req, res) => {
  res.json(state);
}
