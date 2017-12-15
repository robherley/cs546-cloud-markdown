const userAPI = require('../../controllers/userControls');
const router = require('express').Router();
const passport = require('passport');

router.post('/api/v1/user/register', userAPI.register);
router.post(
	'/api/v1/user/login',
	passport.authenticate('local', { failWithError: true }),
	(req, res, next) => {
		// handle success
		userAPI.login(req, res);
	},
	(err, req, res, next) => {
		// handle error
		if (err) {
			res.status(409).json({
				error: 'Invalid Username or Password'
			});
		}
	}
);
router.post('/api/v1/user/update', userAPI.isAuthUser, userAPI.updateUser);
router.get('/api/v1/user/about', userAPI.isAuthUser, userAPI.aboutUser);
router.get('/api/v1/user/logout', userAPI.isAuthUser, userAPI.logout);
router.get('/api/v1/user/getfiles', userAPI.isAuthUser, userAPI.getUsersFiles);

module.exports = router;
