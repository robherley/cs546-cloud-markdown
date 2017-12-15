const fileAPI = require('../../controllers/fileControls');
const { isAuthUser } = require('../../controllers/userControls');
const router = require('express').Router();
const passport = require('passport');

router.post('/api/v1/file/new', isAuthUser, fileAPI.createFile);
router.post('/api/v1/file/update', isAuthUser, fileAPI.updateFile);
router.post('/api/v1/file/delete', isAuthUser, fileAPI.deleteFile);
router.post('/api/v1/file/load', isAuthUser, fileAPI.loadFile);

module.exports = router;
