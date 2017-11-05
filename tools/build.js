// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
import webpack from 'webpack';
import config from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(
	chalk.cyan('Generating minified bundle. This will take a moment...')
);

webpack(config).run((error, stats) => {
	if (error) {
		// so a fatal error occurred. Stop here.
		console.log(chalkError(error));
		return 1;
	}

	const jsonStats = stats.toJson();

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if (jsonStats.hasWarnings) {
		console.log(chalk.yellow('Webpack generated the following warnings: '));
		jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
	}

	console.log(`Webpack stats: ${stats}`);

	// if we got this far, the build succeeded.
	console.log(
		chalk.green(
			"Your app is compiled in production mode in /dist. It's ready to roll!"
		)
	);

	return 0;
});
