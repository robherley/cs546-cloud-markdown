const userAPI = require('../../controllers/userControls');
const router = require('express').Router();
const passport = require('passport');

router.post('/api/v1/user/register', userAPI.register);
router.post(
	'/api/v1/user/login',
	passport.authenticate('local'),
	userAPI.login
);
router.post('/api/v1/user/logout', userAPI.isAuthUser, userAPI.logout);
router.post('/api/v1/user/getfiles', userAPI.isAuthUser, userAPI.getUsersFiles);
router.post('/api/v1/user/update', userAPI.isAuthUser, userAPI.updateUser);

module.exports = router;
