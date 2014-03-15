goog.provide('arch.shape.Connection');

goog.require('arch.array');
goog.require('goog.array');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @param {!arch.shape.Shape} shape
 * @param {!goog.math.Coordinate} position
 */
arch.shape.Connection = function(shape, position) {
	this.shape = shape;
	shape.connections.push(this);

	this.position = position;

	/** @type {arch.shape.Connection} */
	this.connected = null;

	/** @type {!Array.<!arch.shape.Connection>} */
	this.connections = [];
}; 

/**
 * @param {!Array.<!arch.shape.Connection>} connections
 */
arch.shape.Connection.prototype.setConnections = function(connections) {
	this.connections = connections;
};

/**
 * @return {!Array.<!arch.shape.Connection>} connections
 */
arch.shape.Connection.prototype.getAvailableConnections = function() {
	return this.connections.filter(function(connection) {
		return !connection.connected || connection.connected == this;
	}, this);
};

/**
 * @return {!goog.math.Coordinate}
 */
arch.shape.Connection.prototype.getPosition = function() {
	return this.shape.toAbsolute(this.position);
};

/**
 * @return {arch.shape.Connection}
 */
arch.shape.Connection.prototype.closest = function() {
	var self = this;
	return arch.array.minElement(this.getAvailableConnections(), function(connection) {
		return self.distance(connection);
	});
};

/**
 * @param {!arch.shape.Connection} connection
 */
arch.shape.Connection.prototype.connect = function(connection) {
	this.connected && this.connected.disconnect();

	var curPosition = this.getPosition(),
		newPosition = this.getPosition();
	if(goog.math.Coordinate.distance(curPosition, newPosition) > .5) {
		this.shape.setPosition(newPosition);	
	}
	
	this.connected = connection;
	connection.connected = this;
};

arch.shape.Connection.prototype.disconnect = function() {
	this.connected && (this.connected.connected = null);
	this.connected = null;
};

/**
 * @return {number}
 */
arch.shape.Connection.prototype.distance = function(connection) {
	return goog.math.Coordinate.distance(this.getPosition(), connection.getPosition());
};
