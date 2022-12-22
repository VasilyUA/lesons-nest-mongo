import type { Config } from 'jest';

const config: Config = {
	clearMocks: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: '<rootDir>/coverage',
	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['node_modules', 'validation.exception.ts', 'main.ts', 'jwt.seting.ts', 'mysql.ts'],
	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
	// Activates notifications for test results
	notify: true,
	// An enum that specifies notification mode. Requires { notify: true }
	// notifyMode: "failure-change",
	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest/presets/default-esm',
	// The root directory that Jest should scan for tests and modules within
	rootDir: './',
	// A list of paths to directories that Jest should use to search for files in
	roots: ['src', 'test'],
	// The test environment that will be used for testing
	testEnvironment: 'node',
	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],
	// Indicates whether each individual test should be reported during the run
	verbose: true,
	// Options that will be passed to the testEnvironment
	testEnvironmentOptions: {
		NODE_ENV: 'test',
	},
	// Add jest-expect-message
	setupFilesAfterEnv: ['jest-expect-message'],

	// All imported modules in your tests should be mocked automatically
	// automock: false,

	// Stop running tests after `n` failures
	// bail: 0,

	// The directory where Jest should store its cached dependency information
	// cacheDirectory: "C:\\Users\\Rivo\\AppData\\Local\\Temp\\jest",

	// Indicates whether the coverage information should be collected while executing the test
	// collectCoverage: false,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/node_modules/', '!<rootDir>/coverage/', '!<rootDir>/dist/', '!<rootDir>/test/'],

	// A list of reporter names that Jest uses when writing coverage reports
	// coverageReporters: [
	//   "json",
	//   "text",
	//   "lcov",
	//   "clover"
	// ],

	// An object that configures minimum threshold enforcement for coverage results
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},

	// A path to a custom dependency extractor
	// dependencyExtractor: undefined,

	// Make calling deprecated APIs throw helpful error messages
	// errorOnDeprecated: false,

	// Force coverage collection from ignored files using an array of glob patterns
	// forceCoverageMatch: [],

	// A path to a module which exports an async function that is triggered once before all test suites
	// globalSetup: './test/utils/db/setup.js',

	// A path to a module which exports an async function that is triggered once after all test suites
	// globalTeardown: undefined,

	// A set of global variables that need to be available in all test environments
	globals: {
		'ts-jest': {
			tsconfig: {
				module: 'ESNext',
				target: 'ESNext',
			},
			useESM: true,
		},
	},

	// An array of directory names to be searched recursively up from the requiring module's location
	// moduleDirectories: [
	//   "node_modules"
	// ],

	// An array of file extensions your modules use
	moduleFileExtensions: ['js', 'json', 'ts'],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	// moduleNameMapper: {},

	// Activates notifications for test results
	// notify: false,

	// An enum that specifies notification mode. Requires { notify: true }
	// notifyMode: "failure-change",

	// Run tests from one or more projects
	// projects: undefined,

	// Use this configuration option to add custom reporters to Jest
	// reporters: undefined,

	// Automatically reset mock state between every test
	// resetMocks: false,

	// Reset the module registry before running each individual test
	// resetModules: false,

	// A path to a custom resolver
	// resolver: undefined,

	// Automatically restore mock state between every test
	// restoreMocks: false,

	// Allows you to use a custom runner instead of Jest's default test runner
	// runner: "jest-runner",

	// The paths to modules that run some code to configure or set up the testing environment before each test
	// setupFiles: [],

	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	// setupFilesAfterEnv: [],

	// A list of paths to snapshot serializer modules Jest should use for snapshot testing
	// snapshotSerializers: [],

	// Adds a location field to test results
	// testLocationInResults: false,

	// The regexp pattern or array of patterns that Jest uses to detect test files
	//   testRegex: ['.*\\.test\\.ts$'],

	// This option allows the use of a custom results processor
	// testResultsProcessor: undefined,

	// This option allows use of a custom test runner
	// testRunner: "jasmine2",

	// This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
	// testURL: "http://localhost",

	// Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
	// timers: "real",

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.(t)s$': 'ts-jest',
	},

	// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
	transformIgnorePatterns: ['\\\\node_modules\\\\'],

	// An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
	// unmockedModulePathPatterns: undefined,

	// An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
	// watchPathIgnorePatterns: [],

	// Whether to use watchman for file crawling
	// watchman: true,
};

export default config;
