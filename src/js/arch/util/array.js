goog.provide('arch.array');

goog.require('goog.array');

/**
 * @param {!Array.<T>} array
 * @param {function(this:S,T):!Array.<T>} f
 * @param {S} self
 * @return {!Array.<T>}
 * @template S, T
 */
arch.array.flatMap = function(array, f, self) {
	var ret = [];
	array.forEach(function(elem) {
		goog.array.extend(ret, f.call(self, elem));
	});
	return ret;
};

/**
 * @param {!Array.<T>} array
 * @param {function(T):number} f
 * @return {T|undefined}
 * @template T
 */
arch.array.minElement = function(array, f) {
	var element;
	array.reduce(function(min, e) {
		var val = f(e);
		if(val < min) {
			element = e;
			return val;
		}
		return min;
	}, Infinity);
	return element;
};
