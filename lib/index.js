"use strict";

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
var cyclicNext = function cyclicNext(max) {
  var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var inc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return (curr + inc) % max;
};

module.exports = cyclicNext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvaW5kZXguanMiXSwibmFtZXMiOlsiY3ljbGljTmV4dCIsIm1heCIsImN1cnIiLCJpbmMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFNQSxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsR0FBRDtBQUFBLE1BQU1DLElBQU4sdUVBQWEsQ0FBYjtBQUFBLE1BQWdCQyxHQUFoQix1RUFBc0IsQ0FBdEI7QUFBQSxTQUE0QixDQUFDRCxPQUFPQyxHQUFSLElBQWVGLEdBQTNDO0FBQUEsQ0FBbkI7O0FBRUFHLE9BQU9DLE9BQVAsR0FBaUJMLFVBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbmFtZSBjeWNsaWNOZXh0XG4gKiBAdmVyc2lvbiAxLjAuMFxuICogQHNpbmNlXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IE1heGltdW0gbnVtYmVyIHRvIGN5Y2xlIGFyb3VuZFxuICogQHBhcmFtIHtudW1iZXJ9IGN1cnIgQ3VycmVudCBudW1iZXIgKGRlZmF1bHQ6IDApXG4gKiBAcGFyYW0ge251bWJlcn0gaW5jIEluY3JlbWVudCBhbW91bnQgKGRlZmF1bHQ6IDEpXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjeWNsaWMgbmV4dCBkZXNpcmVkIG51bWJlclxuICogQGV4YW1wbGVcbiAqXG4gKiBjeWNsaWNOZXh0KDUsIDApIC8vPT4gMVxuICogY3ljbGljTmV4dCg1LCAxKSAvLz0+IDJcbiAqIGN5Y2xpY05leHQoNSwgMikgLy89PiAzXG4gKiBjeWNsaWNOZXh0KDUsIDMpIC8vPT4gNFxuICogY3ljbGljTmV4dCg1LCA0KSAvLz0+IDBcbiAqIGN5Y2xpY05leHQoNSwgNCwgMSkgLy89PiAwXG4gKi9cbmNvbnN0IGN5Y2xpY05leHQgPSAobWF4LCBjdXJyID0gMCwgaW5jID0gMSkgPT4gKGN1cnIgKyBpbmMpICUgbWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGN5Y2xpY05leHQ7XG4iXX0=