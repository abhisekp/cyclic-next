'use strict';
function releasePolicy(branch, version) {
  if (!/^[1-9]\d*\.\d+\.\d+$/.test(version)) throw new Error('Only stable semver versions can be released.');
  var major = Number(version.split('.')[0]);
  if (branch === 'master' && major === 1) return { tag: 'latest', gitTag: 'v' + version };
  if (branch === '1.x' && major === 1) return { tag: 'v1-latest', gitTag: 'v' + version };
  if (branch === '2.x' && major === 2) return { tag: 'latest', gitTag: 'v' + version };
  throw new Error('Release branch and major version do not match.');
}
function registryState(status) {
  if (status === 200) return 'published';
  if (status === 404) return 'unpublished';
  throw new Error('Registry check failed with HTTP ' + status + '; refusing to publish.');
}
module.exports = { releasePolicy: releasePolicy, registryState: registryState };
