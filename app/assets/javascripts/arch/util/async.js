goog.provide('arch.async');

/**
 * Closure library probably has something to replace this (Deferred, etc.),
 * but this is easy to understand.
 */

/**
 * @typedef {function(function()=)}
 */
arch.async = {};

/**
 * @param {Array.<arch.async>} fs
 * @return {arch.async}
 */
arch.async.parallel = function(fs) {
	/**
	 * @param {function()=} done
	 */
	return function(done) {
		var outstanding = fs.length;
		fs.forEach(function(f) {
			f(function() {
				if(!--outstanding) {
					done && done();
				}
			})
		});
	};
};
