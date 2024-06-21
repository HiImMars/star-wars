// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   globals: {
//     "ts-jest": {
//       tsconfig: "<rootDir>/tsconfig.jest.json",
//     },
//   },
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   transformIgnorePatterns: ["/node_modules/"],
// };

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
