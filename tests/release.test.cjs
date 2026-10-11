const { test } = require('node:test');
const assert = require('node:assert/strict');
const { releasePolicy, registryState } = require('../scripts/release-policy.cjs');
test('v1 and v2 releases have independent channels', () => {
  assert.equal(releasePolicy('master', '1.1.0').tag, 'latest');
  assert.equal(releasePolicy('1.x', '1.1.1').tag, 'v1-latest');
  assert.equal(releasePolicy('2.x', '2.0.0').tag, 'latest');
});
test('feature branches and mismatched majors cannot publish', () => {
  for (const [branch, version] of [['feature/test', '1.1.0'], ['master', '2.0.0'], ['1.x', '2.0.0'], ['2.x', '1.1.0'], ['master', '1.1.0-beta.1']]) assert.throws(() => releasePolicy(branch, version));
});
test('registry failures are never treated as an unpublished package', () => {
  assert.equal(registryState(200), 'published');
  assert.equal(registryState(404), 'unpublished');
  for (const status of [401, 403, 429, 500, 503]) assert.throws(() => registryState(status));
});
