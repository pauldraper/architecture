goog.provide('arch.shape.roman');

goog.require('arch.shape.Shape');

/**
 * @extends {arch.shapes.Shape}
 * @constructor
 */
arch.shape.roman.Column = function() {
	arch.shape.Shape.call(this, 'img/column.png');
};
goog.inherits(arch.shape.roman.Column, arch.shape.Shape);

/**
 * @inheritDoc
 */
arch.shape.roman.Column.prototype.getHintPositions = function() {
	return [{x:0, y:0}];
}