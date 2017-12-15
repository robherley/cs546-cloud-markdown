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

// Handlebars View For Login Page
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
		errorFormatter: (param, msg, value) => {
			let namespace = param.split('.'),
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

// API Routes
applyRoutes(app);

// Rendered Routes
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// Static Files (favicon, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Check for auth, serve react app
app.use((req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}, express.static(path.join(__dirname, contentPath)));

app.listen(port, () => {
	console.log(`🌋 [${contentPath}] Listening on port: ${port}`);
});
