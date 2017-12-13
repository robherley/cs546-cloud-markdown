const userAPI = require('../../controllers/userControls');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/v1/user/register', userAPI.register),
  app.post('/api/v1/user/login', passport.authenticate('local'), userAPI.login),
  app.post('/api/v1/user/logout', userAPI.isAuthUser, userAPI.logout),
  app.post('/api/v1/user/getfiles', userAPI.isAuthUser, userAPI.getUsersFiles),
  app.post('/api/v1/user/update', userAPI.isAuthUser, userAPI.updateUser)
};