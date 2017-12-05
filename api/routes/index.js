// api routing
const { Router } = require('express');
const router = Router();

// setup router
require('./auth')(router);
require('./state')(router);
require('./example')(router); // remove me

module.exports = router;
