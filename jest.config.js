module.exports = {
  verbose: true,
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  },
  "moduleNameMapper": {
    'app/core/utils/kbn': '<rootDir>/node_modules/grafana-sdk-mocks/app/core/utils/kbn.js',
    'app/plugins/sdk': '<rootDir>/node_modules/grafana-sdk-mocks/app/plugins/sdk.ts',
  },
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(?!grafana-sdk-mocks)"
  ],
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(\\.|/)(test)\\.ts$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ]
};
