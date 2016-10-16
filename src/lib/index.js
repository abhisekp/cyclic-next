/**
 * @name cyclicNext
 * @version 1.0.0
 * @since
 * @param {number} max Maximum number to cycle around
 * @param {number} curr Current number (default: 0)
 * @param {number} inc Increment amount (default: 1)
 * @return {number} The cyclic next desired number
 * @example
 *
 * cyclicNext(5, 0) //=> 1
 * cyclicNext(5, 1) //=> 2
 * cyclicNext(5, 2) //=> 3
 * cyclicNext(5, 3) //=> 4
 * cyclicNext(5, 4) //=> 0
 * cyclicNext(5, 4, 1) //=> 0
 */
const cyclicNext = (max, curr = 0, inc = 1) => (curr + inc) % max;

module.exports = cyclicNext;
