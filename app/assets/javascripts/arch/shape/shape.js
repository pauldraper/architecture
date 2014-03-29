goog.provide('arch.shape.Shape');

goog.require('arch.array');
goog.require('arch.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Rect');
goog.require('goog.structs.Set');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} name
 * @param {string} url
 * @param {!Array.<!goog.math.Coordinate>} correctPositions
 * @param {!goog.math.Coordinate} size
 */
arch.shape.Shape = function(name, url, size, correctPositions) {
	goog.events.EventTarget.call(this);

	var self = this;

	/** @const */
	this.name = name;

	/** @const */
	this.url = url;

	/** @const */
	this.correctPositions = correctPositions;

	/** @const */
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
	this.dispatchEvent('position');
};

arch.shape.Shape.prototype.getBounds = function() {
	return new goog.math.Rect(this.position.x, this.position.y, this.size.x, this.size.y);
};

/**
 * @param {!goog.math.Coordinate} offset
 */
arch.shape.Shape.prototype.offset = function(offset) {
	this.setPosition(goog.math.Coordinate.sum(offset, this.getPosition()));
};

/**
 * @return {!Array.<!arch.shape.Shape>}
 */
arch.shape.Shape.prototype.getSnapped = function() {
	var snapped = [];
	var visited = new goog.structs.Set;
	(function addSnapped(shape) {
		if(!visited.contains(shape)) {
			visited.add(shape);
			snapped.push(shape);
			shape.connections.forEach(function(connection) {
				if(connection.isSnapped()) {
					addSnapped(connection.other(shape));
				}
			});
		}
	})(this);
	return snapped;
};

/**
 * @return {!Array.<!goog.math.Coordinate>}
 */
arch.shape.Shape.prototype.getCorrectPositions = function() {
	return this.correctPositions;
};

/**
 * @return {!Array.<!goog.math.Rect>}
 */
arch.shape.Shape.prototype.getCorrectBounds = function() {
	return this.getCorrectPositions().map(function(position) {
		return new goog.math.Rect(position.x, position.y, this.size.x, this.size.y);
	}, this);
};

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.getCorrectOffset = function(shape) {
	var offsets = arch.array.flatMap(this.getCorrectPositions(), function(positionA) {
		return shape.getCorrectPositions().map(function(positionB) {
			return goog.math.Coordinate.difference(positionA, positionB);
		});
	});
	return /** @type {!goog.math.Coordinate} */(arch.array.minElement(offsets, function(offset) {
		return goog.math.Coordinate.magnitude(offset);
	}));
};

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.getOffset = function(shape) {
	return goog.math.Coordinate.difference(this.getPosition(), shape.getPosition());
};

/**
 * @param {!goog.math.Coordinate} position
 * @return {!goog.math.Coordinate}
 */
arch.shape.Shape.prototype.toAbsolute = function(position) {
	return goog.math.Coordinate.sum(this.getPosition(), position.clone().scale(this.size.x, this.size.y));
};

/**
 * @param {!Array.<!arch.shape.Shape>=} exclude
 * @return {arch.shape.Connection}
 */
arch.shape.Shape.prototype.closestConnection = function(exclude) {
	var connections;
	if(exclude) {
		var set = new goog.structs.Set(exclude);
		connections = this.connections.filter(function(connection) {
			return !set.contains(connection.other(this));
		}, this);
	} else {
		connections = this.connections;
	}
	return arch.array.minElement(connections, function(connection) {
		return connection.getAccuracy();
	}) || null;
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
			return x <= y + brickSize
				&& x >= y - (b - a) * brickSize - brickSize;
		} else if(m = this.name.match(/limestone-([ab])/)) {
			var direction = m[1];
			var brickSize = this.size.x / 45;

			var x = direction == 'a' ? position.x - this.position.x : this.position.x + this.size.x - position.x;
			var y = position.y - this.position.y;
			return Math.abs(x - y) < brickSize * 3;
		}
		// end workaround
		return true;
	}
	return false;
};
