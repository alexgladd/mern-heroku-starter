// api routing
const { Router } = require('express');
const router = Router();

// setup router
require('./auth')(router);

module.exports = router;
