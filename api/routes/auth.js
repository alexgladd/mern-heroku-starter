// api authentication routing
const { AuthController } = require('../controllers');

const setupAuthRoutes = (router) => {
  router.post('/authenticate/local', (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
  });

  router.post('/authenticate/:network', (req, res) => {
    console.log('Auth request for ' + req.params.network);
    console.log(req.body);

    // TODO move all this logic to the controller
    AuthController.github.authenticate(req.body.code).then(result => {
      console.log('Got authentication result');
      console.log(result);

      res.json({ authenticated: true, name: result.name });
    }).catch(error => {
      res.status(500).json({ error: true, message: error.message });
    });
  });
}



module.exports = setupAuthRoutes;
