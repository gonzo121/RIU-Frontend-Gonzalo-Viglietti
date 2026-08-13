const {
  createCjsPreset,
} = require('jest-preset-angular/presets/index.js');

module.exports = {
  ...createCjsPreset(),

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testMatch: ['**/*.spec.ts'],

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
  ],
};