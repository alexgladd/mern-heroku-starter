// authentication controllers
const Github = require('./github');

exports.localAuthenticate = (req, res) => {
  res.status(501).json({ errorMessage: 'Not implemented' });
}

exports.networkAuthenticate = (req, res) => {
  console.log('Auth request for ' + req.params.network, req.body);

  switch (req.params.network) {
    case 'github':
      Github.authenticate(req, res);
      break;

    default:
      res.status(404).json({ errorMessage: `Unsupported auth network: ${req.params.network}` });
  }
}
