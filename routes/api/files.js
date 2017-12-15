const fileAPI = require('../../controllers/fileControls');
const { isAuthUser } = require('../../controllers/userControls');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/v1/file/new', isAuthUser, fileAPI.createFile),
  app.post('/api/v1/file/update', isAuthUser, fileAPI.updateFile),
  app.post('/api/v1/file/delete', isAuthUser, fileAPI.deleteFile),
  app.post('/api/v1/file/load', isAuthUser, fileAPI.loadFile)
};