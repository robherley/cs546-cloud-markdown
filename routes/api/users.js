const userAPI = require('../../controllers/userControls.js');
const passport = require('passport');

module.exports = (app) => {
  app.post('/api/v1/register', userAPI.register),
  app.post('/api/v1/login', passport.authenticate('local'), userAPI.login)
};