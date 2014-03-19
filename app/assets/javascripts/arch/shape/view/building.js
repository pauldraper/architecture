goog.provide('arch.shape.view.Building');

goog.require('arch.dom.Disposable');
goog.require('arch.shape.view.Shape');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!arch.gui.building.Viewport} viewport
 * @param {!arch.shape.Building} model
 */
arch.shape.view.Building = function(viewport, model) {
	goog.events.EventHandler.call(this);

	/** @const */
	this.viewport = viewport;

	/** @const */
	this.model = model;

	/** @type {!jQuery} */
	this.dom;
	this.build(viewport.dom);

	/** @const */
	this.shapes = this.model.shapes.map(function(shape) {
		return new arch.shape.view.Shape(viewport, shape);
	});
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
	var width = this.viewport.dom.width();
	var height = this.viewport.dom.height();
	this.model.shapes.forEach(function(shape) {
		shape.setPosition(new goog.math.Coordinate(Math.random()*(width-shape.size.x), Math.random()*(height-shape.size.y)));
	}, this);
};

