goog.provide('arch.shape.Shape');

goog.require('arch.array');
goog.require('arch.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} name
 * @param {string} url
 * @param {!goog.math.Coordinate} size
 */
arch.shape.Shape = function(name, url, size) {
	goog.events.EventTarget.call(this);

	var self = this;

	/** @const */
	this.name = name;

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
	this.fireListeners('position', false, null);
};

arch.shape.Shape.prototype.disconnect = function() {
	this.connections.forEach(function(connection) {
		connection.disconnect();
	});
};

/**
 * @param {!goog.math.Coordinate} position
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.toAbsolute = function(position) {
	return goog.math.Coordinate.sum(this.getPosition(), position.clone().scale(this.size.x, this.size.y));
};

/**
 * @return {?{a:!arch.shape.Connection, b:!arch.shape.Connection}}
 */
arch.shape.Shape.prototype.closestConnections = function() {
	var a = arch.array.minElement(this.connections, function(connection) {
		var closest = connection.closest();
		return closest ? connection.distance(closest) : Infinity;
	});
	return a ? {a:a, b:/** @type {!arch.shape.Connection} */(a.closest())}
		: null;
};

/**
 * @param {!goog.math.Coordinate} position
 * @return {boolean}
 */
arch.shape.Shape.prototype.hitTest = function(position) {
	var inBox = this.position.x <= position.x
		&& this.position.y <= position.y
		&& this.position.x + this.size.x >= position.x
		&& this.position.y + this.size.y >= position.y;
	if(inBox) {
		// start workaround for SVG hit test for Great Pyramid
		// TODO: find a better way
		var m;
		if(m = this.name.match(/bricks-(\d+)-(\d+)-([ab])/)) {
			var a = parseInt(m[1], 10);
			var b = parseInt(m[2], 10);
			var direction = m[3];
			var brickSize = this.size.x / (b - 1);

			var x = direction == 'a' ? position.x - this.position.x : this.position.x + this.size.x - position.x;
			var y = position.y - this.position.y;
			return x <= y + brickSize * 2
				&& x >= y - (b - a) * brickSize - brickSize * 2;
		} else if(m = this.name.match(/limestone-([ab])/)) {
			var direction = m[1];
			var brickSize = this.size.x / 45;

			var x = direction == 'a' ? position.x - this.position.x : this.position.x + this.size.x - position.x;
			var y = position.y - this.position.y;
			window.console.log(x, y, brickSize);
			return Math.abs(x - y) < brickSize * 5;
		}
		// end workaround
		return true;
	}
	return false;
};
