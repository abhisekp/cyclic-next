import { rollup } from 'rollup';
import { mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await mkdir('lib', { recursive: true });
const bundle = await rollup({ input: 'src/index.js' });
for (const [file, format] of [['cyclic-next.cjs.js', 'cjs'], ['cyclic-next.esm.js', 'es'], ['cyclic-next.mjs', 'es'], ['cyclic-next.umd.js', 'umd']]) {
  await bundle.write({ file: `dist/${file}`, format, name: 'cyclicNext', exports: 'named', sourcemap: true, generatedCode: 'es5' });
}
await bundle.close();
await writeFile('dist/index.js', "'use strict';\nvar cyclicNext = require('./cyclic-next.cjs.js').cyclicNext;\nmodule.exports = cyclicNext;\nmodule.exports.cyclicNext = cyclicNext;\nmodule.exports.default = cyclicNext;\n");
await writeFile('lib/index.js', "'use strict';\nmodule.exports = require('../dist/index.js');\n");
await writeFile('dist/index.d.ts', 'declare function cyclicNext(max: number, curr?: number, inc?: number): number;\ndeclare namespace cyclicNext { export { cyclicNext, cyclicNext as default }; }\nexport = cyclicNext;\n');
await writeFile('dist/cyclic-next.d.mts', 'export declare function cyclicNext(max: number, curr?: number, inc?: number): number;\nexport default cyclicNext;\n');
console.log('Built CommonJS, ES modules, UMD, legacy entry point, and types.');
