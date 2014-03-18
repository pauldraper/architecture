goog.provide('arch.shape.Building');

goog.require('arch.shape.Shape');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} displayName
 * @param {!Object} background
 * @param {!Array.<!arch.shape.Shape>} shapes
 */
arch.shape.Building = function(displayName, background, shapes) {
	goog.events.EventTarget.call(this);

	this.displayName = displayName;

	this.background = background;

	this.shapes = shapes;
};
goog.mixin(arch.shape.Building.prototype, goog.events.EventTarget.prototype);
