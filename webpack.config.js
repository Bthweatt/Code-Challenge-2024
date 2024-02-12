const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const siteRoot = path.basename(path.resolve(process.cwd()));
const publicPath = `/dist`;

const mapFilenamesToEntries = (pattern) => glob
	.sync(pattern)
	.reduce((entries, filename) => {
		const [, name] = filename.match(/([^/]+)\.scss$/);
		return { ...entries, [name]: `./${filename}` };
	}, {});

module.exports = {
		name: 'code-challenge',
		mode: 'development',
		entry: {
			critical: './src/stylesheets/critical.scss',
			'layout-testimonial-slider': './src/javascripts/layout-testimonial-slider.js',
		},
		output: {
			filename: 'js/[name].js',
			publicPath: '/dist',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
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
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),

			new StyleLintPlugin({
				files: 'src/**/*.scss',
				fix: false,
			}),

			new ESLintPlugin({
				extensions: ['js']
			}),
		],
		devServer: {
			static: './',
			hot: true,
		},
	};
