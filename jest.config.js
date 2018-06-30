module.exports = {
  transform: {
    '^.+\\.jsx?$': 'buble-jest-flow',
  },
  verbose: true,
  collectCoverage: true,
  notify: true,
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
};
