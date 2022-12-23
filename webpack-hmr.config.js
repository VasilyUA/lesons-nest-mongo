/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (options, webpack) {
	return {
		...options,
		output: {
			...options.output,
			clean: true,
			path: path.resolve(__dirname, 'dist'),
		},
		experiments: {
			...options.experiments,
			topLevelAwait: true,
		},
		mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',
		entry: ['webpack/hot/poll?100', options.entry],
		externals: [
			nodeExternals({
				allowlist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [
			...options.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new webpack.WatchIgnorePlugin({
				paths: [/\.js$/, /\.d\.ts$/],
			}),
			new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
			new CleanWebpackPlugin(),
		],
		module: {
			rules: [
				...options.module.rules,
				// NestJS with babel-loader can't work correctly. Endpoints method are not found.
			],
		},
	};
};
