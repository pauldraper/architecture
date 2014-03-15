goog.provide('arch.shape.view.Building');

goog.require('arch.dom.Disposable');
goog.require('arch.shape.view.Shape');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {arch.shape.Building} model
 */
arch.shape.view.Building = function(parent, model) {
	goog.events.EventHandler.call(this);

	/** @const **/
	this.model = model;

	/** @type {!jQuery} */
	this.dom;
	this.build(parent);

	/** @const **/
	this.shapes = this.model.shapes.map(function(shape) {
		return new arch.shape.view.Shape(this.dom, shape);
	}, this);
	this.shapes.forEach(function(shape) {
		this.registerDisposable(shape);
	}, this);
};
goog.mixin(arch.shape.view.Building.prototype, goog.events.EventHandler.prototype);

/**
 * @param {!jQuery} parent
 */
arch.shape.view.Building.prototype.build = function(parent) {
	this.dom = $('<div class="building"></div>').appendTo(parent);
	this.registerDisposable(new arch.dom.Disposable(this.dom));
};

arch.shape.view.Building.prototype.shuffle = function() {
	this.model.shapes.forEach(function(shape) {
		shape.setPosition(new goog.math.Coordinate(Math.random()*200, Math.random()*100));
	}, this);
};

