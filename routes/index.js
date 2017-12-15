const files = require('./api/files');
const sample = require('./api/sample');
const users = require('./api/users');

module.exports = app => {
	// Require all files in api directory
	app.use(files);
	app.use(sample);
	app.use(users);
};
