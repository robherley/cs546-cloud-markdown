const userAPI = require('../../controllers/userControls.js');

module.exports = (app) => {
  app.post('/api/v1/register', userAPI.register);
}