/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputFilename = 'jobs.js';

module.exports = {
	entry: {
		main: './jobs/main.ts',
	},
	output: {
		filename: outputFilename,
		path: path.resolve(__dirname, 'dist', 'jobs'),
		clean: true,
	},
	ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
	devtool: false,
	mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',
	target: 'node',
	externalsPresets: { node: true },
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new RunScriptWebpackPlugin({ name: outputFilename, autoRestart: false }), new CleanWebpackPlugin()],
	optimization: {
		nodeEnv: false,
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							configFile: 'tsconfig.jobs.json',
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /.js?$/,
				exclude: /node_modules/,
			},
		],
	},
	experiments: {
		topLevelAwait: true,
	},
};
