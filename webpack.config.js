const IS_PRODUCTION =true;
const IS_DEBUGGING = process.env.DEBUG && process.env.DEBUG.trim() == 'debug';

const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract_styles = new ExtractTextPlugin("css/main.css");
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common_plugins = [
	new webpack.SourceMapDevToolPlugin({
		filename: 'sourceMaps/[file].map'
	})
];
if (IS_PRODUCTION) {
	console.log('production');
	[
		new UglifyJSPlugin({
			cache: true,
			parallel: true,
			sourceMap: true
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: '../report.html'
		})
	].forEach(plugin => common_plugins.push(plugin));
}

const common = {
	mode: IS_PRODUCTION ? 'production' : 'development',
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: 'babel-loader'
			}],
			exclude: /node_modules/
		},
		{
			test: /\.html$/,
			use: [{
				loader: 'raw-loader'
			}]
		},
		{
			test: /\.(s?css)$/,
			use: extract_styles.extract({
				fallback: "style-loader",
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: IS_PRODUCTION,
						minimize: IS_PRODUCTION
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: IS_PRODUCTION
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: IS_PRODUCTION
					}
				}
				]
			})
		},
		{
			test: /\.(png|jpe?g|gif|svg|ico)$/,
			loader: 'file-loader?name=/assets/images/[name].[ext]'
		},
		{
			test: /\.(woff|woff2|ttf|eot)$/,
			loader: 'file-loader?name=/assets/fonts/[name].[hash].[ext]'
		}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'] // common extensions
	},
	devtool: !IS_PRODUCTION && IS_DEBUGGING ? 'inline-source-map' : ''
};

const frontend = {
	entry: {
		frontend: ['babel-polyfill', './src/js/entry/frontend.jsx']
	},
	output: {
		filename: 'js/[name]-dist.js'
	},
	plugins: [
		...common_plugins
	]
};

frontend.plugins.push(
	extract_styles
);
if (IS_PRODUCTION) {
	frontend.plugins.push(
		new PurifyCSSPlugin({
			purifyOptions: {
				whitelist: ['*modal*', '*datepicker*', '*month*', '*svg*', 'ul:not(.browser-default)*', '*select-wrapper*', '*enter*', '*leave*', '*exit*', '*checkbox*']
			},
			paths: glob.sync([
				path.join(__dirname, 'src/js/**/*.js'),
				path.join(__dirname, 'src/js/**/*.jsx')
			]),
			minimize: true,
			verbose: true,
		})
	);
}

const backend = {
	entry: {
		backend: './src/js/entry/backend.jsx'
	},
	output: {
		filename: 'js/[name]-dist.js'
	},
	plugins: [
		...common_plugins
	],
	target: 'node',
	externals: [nodeExternals()]
};

module.exports = [
	Object.assign({}, common, frontend),
	Object.assign({}, common, backend),
];