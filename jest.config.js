module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['<rootDir>/node_modules', 'node_modules'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/cypress/',
    '<rootDir>/dist/',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
