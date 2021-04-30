"use strict";
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            {pattern: './src/**/*.ts'},
            {pattern: './test/**/*.ts'}
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        reporters: ['progress', 'karma-typescript', 'coverage'],
        coverageReporter: {
            reporters: [{type: 'lcov'}]
        },

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.test.json'
        },

        logLevel: config.LOG_DEBUG,

        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
    });
};
