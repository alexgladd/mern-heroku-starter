// example routes that use auth middleware

const { ExampleController } = require('../controllers');
const auth = require('../middleware/auth');

const setupExampleRoutes = (router) => {
  router.route('/example')
    .get(auth.authenticateUser, ExampleController.authenticatedResource);

  router.route('/user/:userId/example')
    .get(auth.authenticateUser, auth.authorizeUser, ExampleController.authorizedResource);
}

module.exports = setupExampleRoutes;
