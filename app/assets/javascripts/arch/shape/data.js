goog.provide('arch.shape.data');

goog.require('arch.shape.Building');
goog.require('arch.shape.Connection');
goog.require('arch.shape.Shape');
goog.require('goog.array');
goog.require('goog.math.Coordinate');
goog.require('goog.object');

/**
 * @param {!Object} data
 * @return {!arch.shape.Shape}
 */
arch.shape.data.toShape = function(name, data, positionData) {
	var size = new goog.math.Coordinate(data['size']['w'], data['size']['h']);
	var position = new goog.math.Coordinate(positionData['x'], positionData['y']);
	return new arch.shape.Shape(name, data['img'], size, position);
};

/**
 * @param {!Object} data
 * @return {!arch.shape.Building}
 */
arch.shape.data.toBuilding = function(data) {
	var shapesMap = goog.object.map(data['shapes'], function(data, name) {
		return data['positions'].map(function(positionData) {
			return arch.shape.data.toShape(name, data, positionData);
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
	return new arch.shape.Building(data['building']['displayName'], data['background'], shapes);
};
