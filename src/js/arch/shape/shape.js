goog.provide('arch.shape.Shape');

goog.require('arch.array');
goog.require('arch.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} url
 * @param {!goog.math.Coordinate} size
 */
arch.shape.Shape = function(url, size) {
	goog.events.EventTarget.call(this);

	var self = this;

	/** @const */
	this.url = url;

	this.size = size;

	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate;

	/** @type {!Array.<arch.shape.Connection>} */
	this.connections = [];
};
goog.mixin(arch.shape.Shape.prototype, goog.events.EventTarget.prototype);

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.getPosition = function() {
	return this.position;
};

/**
 * @param {!goog.math.Coordinate} position
 */
arch.shape.Shape.prototype.setPosition = function(position) {
	this.position = position;
	this.fireListeners('position', false, this.position);
};

/**
 * @param {!goog.math.Coordinate} position
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.toAbsolute = function(position) {
	return goog.math.Coordinate.sum(this.getPosition(), position.scale(this.size.x, this.size.y));
};

/**
 * @return {!Array.<arch.shape.Connection>}
 */
arch.shape.Shape.prototype.closestConnections = function() {
	var a = arch.array.minElement(this.connections, function(connection) {
		var closest = connection.closest();
		if(closest) {
			return connection.distance(closest);
		}
		return Infinity;
	});
	var b = a.closest();
	return {a:a, b:b};
};
