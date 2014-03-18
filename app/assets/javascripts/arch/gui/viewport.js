goog.provide('arch.gui.Viewport');

goog.require('arch.shape.view.Building');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {!arch.gui.Gui} gui
 */
arch.gui.Viewport = function(gui) {
	goog.events.EventTarget.call(this);

	/** @type {!jQuery} */
	this.dom = gui.dom.children('.viewport');

	/** @type {arch.shape.view.Building} */
	this.building = null;

	this.scale = 1;

	this.offset = new goog.math.Coordinate;
};
goog.mixin(arch.gui.Viewport.prototype, goog.events.EventTarget.prototype);

arch.gui.Viewport.prototype.setBuilding = function(building) {
	//this.dom.css('background', 'url('+building.background.img+')');
	//this.dom.css('filter', 'alpha(opacity=50)');
	this.building = new arch.shape.view.Building(this, building);
	this.building.shuffle();
};

/**
 * @param {number} scale
 */
arch.gui.Viewport.prototype.setScale = function(scale) {
	this.scale = scale;
	this.fireListeners('scale', false, undefined);
};

/**
 * @param {!goog.math.Coordinate} position
 */
arch.gui.Viewport.prototype.toDOMPosition = function(position) {
	return goog.math.Coordinate.sum(this.toDOMSize(position), this.offset);
};

/**
 * @param {!goog.math.Coordinate} size
 */
arch.gui.Viewport.prototype.toDOMSize = function(size) {
	return size.clone().scale(this.scale);
};
