export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { rootMode: "upward" }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/testStyleStub.js",
  },
};
