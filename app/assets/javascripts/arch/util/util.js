goog.provide('arch.lazy');

/**
 * @param {function():T=} f
 * @return {function():T}
 * @template T
 */
arch.lazy = function(f) {
	var value;
	return function() {
		if(f) {
			value = f();
			f = undefined; // gc
		}
		return value;
	};
};
