// app server main
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // load development environment vars from .env
  require('dotenv').config();
}

// connect mongo
const mongoose = require('mongoose');
// TODO connect

// setup server
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.set('port', process.env.PORT || 3001);

// environment-specific config
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));

  // serve static client assets in production
  app.use(express.static(__dirname + '/app/build'));
  app.get('/', (req, res) => { res.redirect(301, '/app'); });
  app.get(/\/app\/?.*/, (req, res) => {
    res.sendFile(__dirname + '/app/build/index.html');
  });
} else {
  app.use(morgan('dev'));
}

// load api routers
const authRouter = require('./api/authRoutes');
const apiRouter = require('./api/routes');
// parse application/json then use the api routers
app.use('/api', bodyParser.json(), authRouter, apiRouter);

// start listening
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

// https://github.com/fullstackreact/food-lookup-demo
// https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
