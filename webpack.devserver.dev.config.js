const IS_PRODUCTION = false;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extract_styles = new ExtractTextPlugin("css/main.css");
const nodeExternals = require('webpack-node-externals');

const devserver = {
	mode: 'development',
	entry: {
		devserver: ['babel-polyfill', './src/js/entry/devserver.jsx']
	},
	output: {
		filename: 'js/[name]-dist.js'
	},
	optimization: {
    noEmitOnErrors: true
	},
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
	target: 'node',
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.js', '.jsx'] // common extensions
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'eval-source-map'
};

module.exports = devserver;