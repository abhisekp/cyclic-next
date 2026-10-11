import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const run = args => execFileSync(process.execPath, [process.env.npm_execpath, ...args], { encoding: 'utf8' });
const [packed] = JSON.parse(run(['pack', '--ignore-scripts', '--json']));
const folder = await mkdtemp(join(tmpdir(), 'cyclic-next-'));
try {
  run(['install', '--prefix', folder, resolve(packed.filename), '--offline', '--ignore-scripts', '--omit=dev', '--no-audit', '--no-fund', '--package-lock=false']);
  const require = createRequire(join(folder, 'consumer.cjs'));
  const next = require('cyclic-next');
  assert.equal(next(5, 4), 0);
  assert.equal(next.cyclicNext, next);
  assert.equal(next.default, next);
  assert.equal(require('cyclic-next/lib/index.js'), next);
  assert.equal(require('cyclic-next/index.js'), next);
  assert.equal(require('cyclic-next/dist/cyclic-next.cjs.js').cyclicNext(5, 4, 3), 2);
  const native = await import(pathToFileURL(require.resolve('cyclic-next')));
  assert.equal(native.default(5, 4), 0);
  assert.equal(native.cyclicNext(5, 4, 3), 2);
  const esm = await import(pathToFileURL(require.resolve('cyclic-next/dist/cyclic-next.mjs')));
  assert.equal(esm.default(5, 4), 0);
  assert.equal(esm.cyclicNext(5, 4, 3), 2);
  const manifest = JSON.parse(await readFile(require.resolve('cyclic-next/package.json'), 'utf8'));
  assert.equal(Object.keys(manifest.dependencies || {}).length, 0);
  const paths = packed.files.map(f => f.path);
  for (const expected of ['LICENSE', 'README.md', 'dist/index.d.ts', 'dist/cyclic-next.d.mts', 'lib/index.js']) assert(paths.includes(expected));
  assert(!paths.some(path => /^(docs|scripts|tests|node_modules)\//.test(path)));
  console.log(`Installed and verified ${packed.filename}: ${packed.size} bytes, zero runtime dependencies.`);
} finally {
  await rm(folder, { recursive: true, force: true });
  await rm(packed.filename, { force: true });
}
