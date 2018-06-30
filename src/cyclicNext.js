/**
 * @name cyclicNext
 * @version 1.0.0
 * @since 1.0.0
 * @param {number} max The Maximum number to cycle around
 * @param {number} [curr=0] Current number
 * @param {number} [inc=1] Increment amount
 * @return {number} The cyclic next number
 * @example
 *
 * cyclicNext(5, 0) //=> 1
 * cyclicNext(5, 1) //=> 2
 * cyclicNext(5, 2) //=> 3
 * cyclicNext(5, 3) //=> 4
 * cyclicNext(5, 4) //=> 0
 * cyclicNext(5, 4, 1) //=> 0
 */
const cyclicNext = (max: number, curr: number = 0, inc: number = 1): number => (curr + inc) % max;

export default cyclicNext;
