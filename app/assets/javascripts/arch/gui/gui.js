goog.provide('arch.gui.Gui');

goog.require('arch.gui.Viewport');
goog.require('arch.shape.data');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.gui.Gui = function(dom) {
	this.dom = dom;

	this.viewport = new arch.gui.Viewport(this);
};

arch.gui.Gui.prototype.setTitle = function(title) {
	this.dom.children('.title-bar').text(title);
};


arch.gui.Gui.prototype.setBuilding = function(building) {
	this.setTitle(building.displayName);
	this.viewport.setBuilding(building);
};
