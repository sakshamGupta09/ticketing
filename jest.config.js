const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10,
    },
  },
  coveragePathIgnorePatterns: ['.service.ts'],
};
