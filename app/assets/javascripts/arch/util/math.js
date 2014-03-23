goog.provide('arch.math.Rect');

goog.require('goog.asserts');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');

/**
 * @param {!Array.<!goog.math.Rect>} rectangles must be nonempty
 * @return {!goog.math.Rect}
 */
arch.math.Rect.combine = function(rectangles) {
	goog.asserts.assert(rectangles.length);
	var combined;
	rectangles.forEach(function(rectangle) {
		if(combined) {
			combined.boundingRect(rectangle);
		} else {
			combined = rectangle;
		}
	});
	return combined;
};

/**
 * @param {!goog.math.Rect} rectangle
 * @return {!goog.math.Coordinate}
 */
arch.math.Rect.getCenter = function(rectangle) {
	return new goog.math.Coordinate(
		rectangle.left + rectangle.width / 2,
		rectangle.top + rectangle.height / 2
	);
};
