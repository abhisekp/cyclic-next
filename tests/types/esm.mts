import next, { cyclicNext } from '../../dist/cyclic-next.mjs';
const result: number = next(5) + cyclicNext(5, 2);
void result;
