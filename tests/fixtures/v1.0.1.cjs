// Runtime behavior of the published cyclic-next@1.0.1 (MIT).
module.exports = function cyclicNext(max) {
  var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var inc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return (curr + inc) % max;
};
