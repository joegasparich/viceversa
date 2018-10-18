const IS_PRODUCTION = false;

const webpack = require('webpack');

const frontend = {
	mode: 'development',
	entry: {
		frontend: ['babel-polyfill', './src/js/entry/frontend.jsx', 'webpack-hot-middleware/client?reload=true']
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
			loader: "style-loader!css-loader!postcss-loader!sass-loader"
		},
		{
			test: /\.(png|jpe?g|gif|svg|ico)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192000,
						name: "/assets/images/[name].[hash].[ext]"
					}
				}
			]
		},
		{
			test: /\.(woff|woff2|ttf|eot)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192000,
						name: "/assets/fonts/[name].[hash].[ext]"
					}
				}
			]
		}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['.js', '.jsx'] // common extensions
	},
	devtool:'eval-source-map'
};

module.exports = frontend;