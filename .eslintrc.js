module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 2019,
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
		es6: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/no-inferrable-types': 'off',
		'no-var': 'error',
		'no-console': 'error',
		'no-extra-boolean-cast': 'off',
		'no-unused-expressions': 0,
		'class-methods-use-this': ['off'],
		'max-params': ['warn', 6],
		'linebreak-style': [0, 'error', 'windows'],
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': 'error',
		'space-in-parens': 'error',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'prefer-const': 'error',
		'arrow-parens': [2, 'as-needed'],
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				trailingComma: 'all',
				printWidth: 200,
				tabWidth: 2,
				endOfLine: 'auto',
				useTabs: true,
				arrowParens: 'avoid',
			},
		],
	},
};
