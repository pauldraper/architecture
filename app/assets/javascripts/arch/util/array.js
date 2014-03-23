goog.provide('arch.array');

goog.require('goog.array');

/**
 * @param {!Array.<Array.<T>>} a
 * @return {!Array.<T>}
 * @template T
 */
arch.array.flatten = function(a) {
	return Array.prototype.concat.apply([], a);
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
