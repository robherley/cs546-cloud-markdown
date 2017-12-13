const fileAPI = require('../../controllers/fileControls');
const { isAuthUser } = require('../../controllers/userControls');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/v1/file/new', isAuthUser, fileAPI.createFile)
};