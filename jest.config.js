module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/","<rootDir>/studio/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      
    },
    "coverageDirectory": "<rootDir>/coverage"
  };

  