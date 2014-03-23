goog.provide('arch.shape.Connection');

goog.require('arch.array');
goog.require('arch.lazy');
goog.require('goog.array');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @param {!arch.shape.Shape} shapeA
 * @param {!arch.shape.Shape} shapeB
 */
arch.shape.Connection = function(shapeA, shapeB) {
	/** @const */
	this.shapeA = shapeA;

	/** @const */
	this.shapeB = shapeB;

	shapeA.connections.push(this);
	shapeB.connections.push(this);
};

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Connection.prototype.getCorrectOffset = function() {
	return this.shapeB.getCorrectOffset(this.shapeA);
};

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Connection.prototype.getOffset = function() {
	return this.shapeB.getOffset(this.shapeA);
};

/**
 * @return {number}
 */
arch.shape.Connection.prototype.getAccuracy = function() {
	return goog.math.Coordinate.distance(this.getOffset(), this.getCorrectOffset());
};

arch.shape.Connection.prototype.other = function(shape) {
	return this.shapeA === shape ? this.shapeB : this.shapeA;
};
