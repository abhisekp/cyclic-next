/**
 * Advance through a cycle of max positions. Keeps JavaScript remainder semantics.
 * @param {number} max Exclusive upper bound (the number of positions).
 * @param {number} [curr=0] Current position.
 * @param {number} [inc=1] Step size.
 * @returns {number} The remainder of curr + inc divided by max.
 */
function cyclicNext(max) {
  var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var inc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return (curr + inc) % max;
}
export default cyclicNext;
