goog.provide('arch.math.Point');

/**
 * @typedef {x:number, y:number}
 */
arch.math.Point = {};

/** @const */
arch.math.Point.ORIGIN = {x:0, y:0};

/**
 * @param {arch.math.Point...} var_args
 * @return {arch.math.Point}
 */
arch.math.Point.add = function(var_args) {
	return Array.prototype.reduce.call(arguments, function(a, b) {
		return {
			x: a.x + b.x,
			y: a.y + b.y
		};
	}, arch.math.Point.ORIGIN);
};
