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

// Add API routes
require('./routes')(app);

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
app.use(history()); // Polyfill for HTML5 history API (react-router uses this)

// Serve static folder
app.use(express.static(path.join(__dirname, contentPath)));

// Send static index in prod
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, contentPath) });
});

app.listen(port, () => {
	console.log(`🌋 Listening on port: ${port}`);
});
