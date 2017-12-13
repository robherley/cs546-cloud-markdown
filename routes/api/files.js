const fileAPI = require('../../controllers/fileControls');
const userAPI = require('../../controllers/userControls');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/v1/file/new', userAPI.isAuthUser, fileAPI.createFile)
};