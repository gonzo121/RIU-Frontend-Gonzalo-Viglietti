const { createCjsPreset } = require('jest-preset-angular/presets/index.js');

module.exports = {
  ...createCjsPreset(),

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testMatch: ['**/*.spec.ts'],

  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/main.ts'],

  coverageDirectory: 'coverage',

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
