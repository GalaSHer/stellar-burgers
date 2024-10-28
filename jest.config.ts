/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@slices': '<rootDir>/src/services/slices',
    '@utils-cookies': '<rootDir>/src/utils/cookie'
  }
};

//   moduleNameMapper: {
//     '^@api/(.*)$': '<rootDir>/src/utils/burger-api.ts',
//     '^@pages/(.*)$': '<rootDir>/src/pages/$1',
//     '^@components/(.*)$': '<rootDir>/src/components/$1',
//     '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
//     '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
//     '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
//     '^@utils-cookies/(.*)$': '<rootDir>/src/utils/cookie/$1',
//     '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
//     '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
//     '^@services/(.*)$': '<rootDir>/src/services/$1'
//   },

export default config;
