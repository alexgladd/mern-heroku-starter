// api server state routing
const { StateController } = require('../controllers');

const setupStateRoutes = (router) => {
  router.get('/serverstate', StateController.serverState);
}

module.exports = setupStateRoutes;
