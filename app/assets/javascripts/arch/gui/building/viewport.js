goog.provide('arch.gui.building.Viewport');

goog.require('arch.shape.view.Building');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {!arch.gui.building.Gui} gui
 */
arch.gui.building.Viewport = function(gui) {
	goog.events.EventTarget.call(this);

	/** @type {!jQuery} */
	this.dom = gui.dom.children('.viewport');

	/** @type {arch.shape.view.Building} */
	this.building = null;

	this.scale = 1;

	this.offset = new goog.math.Coordinate;
};
goog.mixin(arch.gui.building.Viewport.prototype, goog.events.EventTarget.prototype);

arch.gui.building.Viewport.prototype.setBuilding = function(building) {
	//this.dom.css('background', 'url('+building.background.img+')');
	//this.dom.css('filter', 'alpha(opacity=50)');
	this.building = new arch.shape.view.Building(this, building);
	this.building.shuffle();
};

/**
 * @param {number} scale
 */
arch.gui.building.Viewport.prototype.setScale = function(scale) {
	var oldCenter = this.toDOMPosition(new goog.math.Coordinate);
	this.scale = scale;
	var newCenter = this.toDOMPosition(new goog.math.Coordinate);
	//TODO: fix
	this.offset = goog.math.Coordinate.sum(this.offset, goog.math.Coordinate.difference(newCenter, oldCenter));
	window.console.log(this.offset);
	this.fireListeners('scale', false, null);
};

/**
 * @param {!goog.math.Coordinate} position
 */
arch.gui.building.Viewport.prototype.toDOMPosition = function(position) {
	return goog.math.Coordinate.sum(this.toDOMSize(position), this.offset);
};

/**
 * @param {!goog.math.Coordinate} size
 */
arch.gui.building.Viewport.prototype.toDOMSize = function(size) {
	return size.clone().scale(this.scale);
};
