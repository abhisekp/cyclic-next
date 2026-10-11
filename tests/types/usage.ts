import legacy = require('cyclic-next');
import defaultNext, { cyclicNext } from 'cyclic-next';
const a: number = legacy(5);
const b: number = cyclicNext(5, 4, 3);
const c: number = defaultNext(5, undefined, 1);
const d: number = legacy.cyclicNext(5, 0);
const e: number = legacy.default(5, 0);
void [a, b, c, d, e];
// @ts-expect-error max must be a number
legacy('5');
// @ts-expect-error result is a number
const wrong: string = cyclicNext(5);
void wrong;
