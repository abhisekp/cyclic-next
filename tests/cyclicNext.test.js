// import { cyclicNext } from '../src';
const { cyclicNext } = require('../src');

describe('cyclicNext', () => {
  test('cyclicNext is a function', () => {
    expect(typeof cyclicNext).toBe('function');
  });

  test('cyclicNext(5, 0) => 1', () => {
    expect(cyclicNext(5, 0)).toBe(1);
  });

  test('cyclicNext(5, 1) => 2', () => {
    expect(cyclicNext(5, 1)).toBe(2);
  });

  test('cyclicNext(5, 2) => 3', () => {
    expect(cyclicNext(5, 2)).toBe(3);
  });

  test('cyclicNext(5, 3) => 4', () => {
    expect(cyclicNext(5, 3)).toBe(4);
  });

  test('cyclicNext(5, 4) => 0', () => {
    expect(cyclicNext(5, 4)).toBe(0);
  });

  test('cyclicNext(5, 4, 1) => 0', () => {
    expect(cyclicNext(5, 4, 1)).toBe(0);
  });

  test('cyclicNext(5, 4, 3) => 2', () => {
    expect(cyclicNext(5, 4, 3)).toBe(2);
  });
});
