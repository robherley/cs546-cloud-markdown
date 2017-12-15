const mongoose = require('mongoose');
const config = require('./config');

const mongo_url = config.serverUrl + config.dbName;

mongoose.Promise = global.Promise;

try {
  mongoose.connect(mongo_url, {
    useMongoClient: true
  });
} catch(err) {
  mongoose.createConnection(mongo_url, {
    useMongoClient: true
  });
}

mongoose.connection.once('open', () => console.log('DB success...')).on(
  'error', (err) => {
    throw err;
  });