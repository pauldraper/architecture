goog.provide('arch.shape.data');

goog.require('arch.shape.Building');
goog.require('arch.shape.Connection');
goog.require('arch.shape.Shape');
goog.require('goog.array');
goog.require('goog.math.Coordinate');
goog.require('goog.object');

/**
 * @param {string} name
 * @param {!Object} data
 * @return {!arch.shape.Shape}
 */
arch.shape.data.toShape = function(name, data) {
	var size = new goog.math.Coordinate(data['size']['w'], data['size']['h']);
	var positions = data['positions'].map(function(positionData) {
		return new goog.math.Coordinate(positionData['x'], positionData['y']);
	});
	return new arch.shape.Shape(name, data['img'], size, positions);
};

/**
 * @param {!Object} data
 * @return {!arch.shape.Building}
 */
arch.shape.data.toBuilding = function(data) {
	var shapesMap = goog.object.map(data['shapes'], function(data, name) {
		return data['positions'].map(function() {
			return arch.shape.data.toShape(name, data);
		});
	});

	data['connections'].forEach(function(data) {
		shapesMap[data[0]].forEach(function(shapeA) {
			shapesMap[data[1]].forEach(function(shapeB) {
				new arch.shape.Connection(shapeA, shapeB);
			});
		});
	});

	var shapes = arch.array.flatten(goog.object.getValues(shapesMap));
	return new arch.shape.Building(
		data['id'],
		data['displayName'],
		shapes,
		data['messages']['before'].join('\n'),
		data['messages']['after'].join('\n')
	);
};
