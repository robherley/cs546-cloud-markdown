const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	entry: path.resolve(__dirname, 'src/index'),
	devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
	target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './src',
		historyApiFallback: true,
		hot: true,
		port: 4444,
		proxy: {
			'/api': 'http://localhost:4445'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
			__DEV__: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			// Create HTML file that includes references to bundled CSS and JS.
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
			noInfo: true, // set to false to see a list of every file being bundled.
			options: {
				sassLoader: {
					includePaths: [path.resolve(__dirname, 'src', 'scss')]
				},
				context: '/'
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{ test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			},
			{ test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
			{ test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
			{
				test: /(\.css|\.scss|\.sass)$/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap',
					'sass-loader?sourceMap'
				]
			}
		]
	}
};
