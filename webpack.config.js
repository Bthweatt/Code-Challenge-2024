const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const siteRoot = path.basename(path.resolve(process.cwd()));
const publicPath = `/assets/output/`;
const jsFileName = 'js/[name].js?version=[fullhash]';

const mapFilenamesToEntries = (pattern) => glob
	.sync(pattern)
	.reduce((entries, filename) => {
		const [, name] = filename.match(/([^/]+)\.scss$/);
		return { ...entries, [name]: `./${filename}` };
	}, {});

module.exports = [
	{
		name: 'css',
		mode: 'development',
		entry: {
			critical: './assets/stylesheets/critical.scss',
			...mapFilenamesToEntries('./assets/stylesheets/layouts/*.scss')
		},
		output: {
			filename: 'css/[name].js',
			publicPath,
			path: path.resolve(__dirname, './assets/output'),
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: () => [require('autoprefixer')({
										browsers: ['> 1%', 'last 2 versions'],
									})],
								}
							},
						},
						'sass-loader',
					],
				},
			],
		},
		plugins: [
			new StyleLintPlugin({
				fix: false,
			}),

			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
		],
	}, {
		name: 'js',
		mode: 'development',
		entry: {
			slider: './assets/javascripts/slider.js',
		},
		output: {
			filename: jsFileName,
			publicPath,
			path: path.resolve(__dirname, './assets/output'),
		},
		devtool: 'nosources-source-map',
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},

		plugins: [
			new ESLintPlugin(),
		],
	},
];
