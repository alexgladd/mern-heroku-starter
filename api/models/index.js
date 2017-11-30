// application models

const mongoose = require('mongoose');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;

exports.User = require('./user');
