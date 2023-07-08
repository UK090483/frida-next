const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
  },
}

// module.exports = {
//     testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/","<rootDir>/studio/"],
//     setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
//     transform: {
//       "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",

//     },
//     "coverageDirectory": "<rootDir>/coverage"
//   };

module.exports = createJestConfig(customJestConfig)
