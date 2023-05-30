const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin =
	require('html-inline-css-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
	entry: './src/scripts/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'template.html'),
			filename: 'index.html',
		}),
		new HTMLInlineCSSWebpackPlugin(),
		new FileManagerPlugin({
			events: {
				onStart: {
					delete: ['dist'],
				},
			},
		}),
	],
	devServer: {
		watchFiles: path.join(__dirname, 'src'),
		port: 9000,
	},
};
