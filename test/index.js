import test from 'ava';
import cyclicNext from '../src/lib/';

test('cyclicNext function', t => {
  t.is(typeof cyclicNext, 'function');
});

test('cyclicNext(5, 0) => 1', t => {
  t.is(cyclicNext(5, 0), 1);
});

test('cyclicNext(5, 1) => 2', t => {
  t.is(cyclicNext(5, 1), 2);
});

test('cyclicNext(5, 2) => 3', t => {
  t.is(cyclicNext(5, 2), 3);
});

test('cyclicNext(5, 3) => 4', t => {
  t.is(cyclicNext(5, 3), 4);
});

test('cyclicNext(5, 4) => 0', t => {
  t.is(cyclicNext(5, 4), 0);
});

test('cyclicNext(5, 4, 1) => 0', t => {
  t.is(cyclicNext(5, 4, 1), 0);
});

test('cyclicNext(5, 4, 3) => 2', t => {
  t.is(cyclicNext(5, 4, 3), 2);
});
