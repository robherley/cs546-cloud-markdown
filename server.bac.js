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
const sample = require('./routes/api/files');

// Handlebars view engine (kinda want to switch to jade or pug)
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

//db
require('./db/index');

// Middleware galore
app.use(morgan('dev')); // logging
//app.use(compression()); // gzip
app.use(bodyParser.json()); // process post json
app.use(
	// See: https://www.npmjs.com/package/qs#readme
	bodyParser.urlencoded({
		extended: false // Allows for query strings to be handled like json
	})
);
app.use(cookieParser()); // Parses cookies
app.use(history()); // Polyfill for HTML5 history API (react-router uses this)

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
// applyRoutes(app);

const checkLogin = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.json({ msg: 'You are not logged in.' });
	}
};

app.get('/test', (req, res) => res.send('Howdy'));
// app.get('/', (req, res) => {
// 	res.sendFile('index.html', { root: path.join(__dirname, contentPath) });
// });

// Static Files (favicon, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`🌋 [${contentPath}] Listening on port: ${port}`);
});
