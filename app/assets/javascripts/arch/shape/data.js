goog.provide('arch.shape.data');

goog.require('arch.shape.Building');
goog.require('arch.shape.Connection');
goog.require('arch.shape.Shape');
goog.require('goog.array');
goog.require('goog.math.Coordinate');

/**
 * @param {!Object} data
 * @return {!arch.shape.Shape}
 */
arch.shape.data.toShape = function(data) {
	var size = new goog.math.Coordinate(data['size']['w']/2, data['size']['h']/2);
	return new arch.shape.Shape(data['img'], size);
};

/**
 * @param {!Object} data
 * @return {!arch.shape.Building}
 */
arch.shape.data.toBuilding = function(data) {
	var shapes = data['building']['shapes'].map(function(name) {
		return arch.shape.data.toShape(data['shapes'][name]);
	})
	var shapesMap = goog.array.bucket(shapes, function(_, i) {
		return data['building']['shapes'][i];
	});

	data['connections'].forEach(function(datum) {
		var a = datum[0],
			b = datum[1];
		var connectionsA = shapesMap[a['shape']].map(function(shape) {
			return new arch.shape.Connection(shape, new goog.math.Coordinate(a['position']['x'], a['position']['y']));
		});
		var connectionsB = shapesMap[b['shape']].map(function(shape) {
			return new arch.shape.Connection(shape, new goog.math.Coordinate(b['position']['x'], b['position']['y']));
		});
		connectionsA.forEach(function(connection) {
			connection.setConnections(connectionsB);
		});
		connectionsB.forEach(function(connection) {
			connection.setConnections(connectionsA);
		});
	});

	return new arch.shape.Building(data['building']['displayName'], data['background'], shapes);
};
