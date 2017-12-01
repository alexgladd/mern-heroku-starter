// api routing
const { Router } = require('express');
const router = Router();

// setup router
require('./auth')(router);
require('./state')(router);

module.exports = router;
