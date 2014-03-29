goog.provide('arch.math.Coordinate');
goog.provide('arch.math.Rect');

goog.require('goog.asserts');
goog.require('goog.math');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');

/**
 * @param {!goog.math.Coordinate} coordinate
 * @param {!goog.math.Rect} bounds
 * @return {!goog.math.Coordinate}
 */
arch.math.Coordinate.clamp = function(coordinate, bounds) {
	return new goog.math.Coordinate(
		goog.math.clamp(coordinate.x, bounds.left, bounds.left + bounds.width),
		goog.math.clamp(coordinate.y, bounds.top, bounds.top + bounds.height)
	);
};

/**
 * @param {!Array.<!goog.math.Rect>} rectangles must be nonempty
 * @return {!goog.math.Rect}
 */
arch.math.Rect.combine = function(rectangles) {
	goog.asserts.assert(rectangles.length);
	var result;
	rectangles.forEach(function(rect) {
		if(result) {
			result.boundingRect(rect);
		} else {
			result = rect;
		}
	});
	return result;
};
