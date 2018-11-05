const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract_styles = new ExtractTextPlugin("css/main.css");
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const common_plugins = [
	new webpack.SourceMapDevToolPlugin({
		filename: 'sourceMaps/[file].map'
	})
];

const smp = new SpeedMeasurePlugin();

[
	new UglifyJSPlugin({
		cache: true,
		parallel: true,
		sourceMap: true
	})
].forEach(plugin => common_plugins.push(plugin));

const common = {
	mode: 'production',
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
						sourceMap: true,
						minimize: true
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
				]
			})
		},
		{
			test: /\.(png|jpe?g|gif|svg|ico)$/,
			loader: 'file-loader?name=/assets/[path][name].[ext]&context=src/resources'
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

const backend = {
	entry: {
		backend: ['babel-polyfill', './src/js/entry/backend.jsx']
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

module.exports = smp.wrap([
	Object.assign({}, common, frontend),
	Object.assign({}, common, backend),
]);