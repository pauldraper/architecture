goog.provide('arch.shape.Building');

goog.require('arch.math.Rect');
goog.require('arch.shape.Shape');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} id
 * @param {string} displayName
 * @param {!Array.<!arch.shape.Shape>} shapes
 * @param {string} beforeMessage
 * @param {string} afterMessage
 */
arch.shape.Building = function(id, displayName, shapes, beforeMessage, afterMessage) {
	goog.events.EventTarget.call(this);

	this.id = id;

	this.displayName = displayName;

	this.shapes = shapes;

	this.beforeMessage = beforeMessage;

	this.afterMessage = afterMessage;

};
goog.mixin(arch.shape.Building.prototype, goog.events.EventTarget.prototype);

/**
 * @return {!goog.math.Rect}
 */
arch.shape.Building.prototype.getCorrectBounds = function() {
	var bounds = arch.array.flatMap(this.shapes, function(shape) {
		return shape.getCorrectBounds();
	});
	return arch.math.Rect.combine(bounds);
};

/**
 * @return {boolean}
 */
arch.shape.Building.prototype.isFinished = function() {
	var unique = this.shapes.every(function(shapeA, i, array) {
		return this.shapes.every(function(shapeB, j) {
			return i >= j || goog.math.Coordinate.magnitude(shapeA.getOffset(shapeB)) >= 1;
		});
	}, this);
	if(!unique) {
		return false;
	}

	var baseShape = arch.array.minElement(this.shapes, function(shape) {
		return shape.getCorrectPositions().length;
	}); // choose most performant base
	return this.shapes.every(function(shape) {
		return goog.math.Coordinate.distance(shape.getOffset(baseShape), shape.getCorrectOffset(baseShape)) <= 1;
	});
};
