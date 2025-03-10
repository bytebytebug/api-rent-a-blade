
const config = {
  coverageProvider: "v8",
  preset: "ts-jest",
  roots: [
    "<rootDir>/src"
  ],
  moduleNameMapper: {
    "^#(.*)$": "<rootDir>/src/$1",
  }
};

module.exports = config;