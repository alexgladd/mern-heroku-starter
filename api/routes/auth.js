// api authentication routing
const { AuthController } = require('../controllers');

const setupAuthRoutes = (router) => {
  router.post('/authenticate/local', AuthController.localAuthenticate);
  router.post('/authenticate/:network', AuthController.networkAuthenticate);
}

module.exports = setupAuthRoutes;
