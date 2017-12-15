const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const chalk = require('chalk');
const path = require('path');
const morgan = require('morgan');
const contentPath = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const port = process.env.PORT || 4445;
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const exphbs = require('express-handlebars');
const applyRoutes = require('./routes');

// Init Database
require('./db/index');

// Middleware galore
app.use(morgan('dev')); // logging
app.use(compression()); // gzip
app.use(bodyParser.json()); // process post json
app.use(
	// See: https://www.npmjs.com/package/qs#readme
	bodyParser.urlencoded({
		extended: false // Allows for query strings to be handled like json
	})
);
app.use(cookieParser()); // Parses cookies

//Express session
app.use(
	session({
		secret: 'secret',
		saveUninitialized: true,
		resave: true
	})
);

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(
	expressValidator({
		errorFormatter: function(param, msg, value) {
			var namespace = param.split('.'),
				root = namespace.shift(),
				formParam = root;

			while (namespace.length) {
				formParam += '[' + namespace.shift() + ']';
			}
			return {
				param: formParam,
				msg: msg,
				value: value
			};
		}
	})
);

// Add Routes
applyRoutes(app);

const checkLogin = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/api/sample');
	}
};

// Static Files (favicon, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkLogin, express.static(path.join(__dirname, contentPath)));

applyRoutes(app);

app.listen(port, () => {
	console.log(`🌋 [${contentPath}] Listening on port: ${port}`);
});
