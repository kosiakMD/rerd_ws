var path = require('path')
var webpack = require('webpack')
// var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');


module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		// 'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new NpmInstallPlugin(),
		// new webpack.NoErrorsPlugin() //if no React-hot-eloader?
	],
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ['eslint'],
				include: [
					path.resolve(__dirname, "src"),
				],
			}
		],
		loaders: [
			{
				loaders: [/*'react-hot-loader/webpack',*/ 'react-hot', 'babel-loader'],
				include: [
					path.resolve(__dirname, "src"),
				],
				test: /\.js$/,
				plugins: ['transform-runtime'],
			},
			{
				test:   /\.css$/,
				loader: "style-loader!css-loader!postcss-loader"
			}
		]
	},
	postcss: function () {
		return [autoprefixer, precss];
	}
}