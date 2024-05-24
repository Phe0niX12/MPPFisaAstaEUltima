/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {

  "transform": {
    "^.+\\.js$": "babel-jest"
  },
  "testEnvironment": "jest-environment-node",
  "moduleFileExtensions": ["js"],
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "transformIgnorePatterns": [
      "/node_modules/"
    ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],


};

export default config;
