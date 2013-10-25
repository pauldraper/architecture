goog.provide('arch.Toolbox');

goog.require('arch.shape.Shape');

/**
 * @constructor
 */
arch.Toolbox = function(parent) {
	this.dom = $('<div id=toolbox>').appendTo(parent);
}

/**
 * @param {arch.shape.Shape} shape
 */
arch.Toolbox.prototype.addShape = function(shape) {
	this.dom.append(shape.dom);
};

