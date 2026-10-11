'use strict';
var assert = require('assert');
var vm = require('vm');
var fs = require('fs');
var cyclicNext = require('../dist/index.js');
var baseline = require('./fixtures/v1.0.1.cjs');
var count = 0;
function same(actual, expected) {
  if (expected !== expected) assert(actual !== actual);
  else if (expected === 0) assert.strictEqual(1 / actual, 1 / expected);
  else assert.strictEqual(actual, expected);
  count++;
}
// All eight original assertions, plus both published and repository import forms.
assert.strictEqual(typeof cyclicNext, 'function');
assert.strictEqual(cyclicNext.length, 1);
[[5, 0, 1], [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 0]].forEach(function (v) { same(cyclicNext(v[0], v[1]), v[2]); });
same(cyclicNext(5, 4, 1), 0);
same(cyclicNext(5, 4, 3), 2);
assert.strictEqual(cyclicNext.cyclicNext, cyclicNext);
assert.strictEqual(cyclicNext.default, cyclicNext);
assert.strictEqual(require('../lib/index.js'), cyclicNext);
assert.strictEqual(require('../index.js'), cyclicNext);
same(require('../dist/cyclic-next.cjs.js').cyclicNext(5, 4), 0);
var values = [undefined, null, -Infinity, -17, -5, -1, -0, 0, 0.5, 1, 2, 5, 17, Infinity, NaN, '2', ''];
values.forEach(function (max) {
  values.forEach(function (curr) {
    values.forEach(function (inc) { same(cyclicNext(max, curr, inc), baseline(max, curr, inc)); });
  });
});
same(cyclicNext(), baseline());
same(cyclicNext(5), baseline(5));
var context = {};
vm.runInNewContext(fs.readFileSync(require.resolve('../dist/cyclic-next.umd.js'), 'utf8'), context);
same(context.cyclicNext.cyclicNext(5, 4), 0);
assert.strictEqual(context.cyclicNext.default, context.cyclicNext.cyclicNext);
console.log('Passed original tests, import compatibility, UMD, and ' + count + ' differential assertions on ' + process.version);
