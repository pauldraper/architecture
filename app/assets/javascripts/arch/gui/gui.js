goog.provide('arch.gui.Gui');

goog.require('arch.gui.Viewport');
goog.require('arch.gui.Zoom');
goog.require('arch.shape.data');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.gui.Gui = function(dom) {
	var me = this;

	this.dom = dom;

	this.viewport = new arch.gui.Viewport(this);

	this.zoom = new arch.gui.Zoom(this, $('#zoom-in-button'), $('#zoom-out-button'));
};

arch.gui.Gui.prototype.setTitle = function(title) {
	this.dom.children('.title-bar').text(title);
};


arch.gui.Gui.prototype.setBuilding = function(building) {
	this.setTitle(building.displayName);
	this.viewport.setBuilding(building);
};
