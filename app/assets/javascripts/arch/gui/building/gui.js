goog.provide('arch.gui.building.Gui');

goog.require('arch.gui.building.Viewport');
goog.require('arch.gui.building.Zoom');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.gui.building.Gui = function(dom) {
	var me = this;

	this.dom = dom;

	this.viewport = new arch.gui.building.Viewport(this);

	this.zoom = new arch.gui.building.Zoom(this, $('#zoom-in-button'), $('#zoom-out-button'));
};

arch.gui.building.Gui.prototype.setTitle = function(title) {
	this.dom.children('.title-bar').text(title);
};


arch.gui.building.Gui.prototype.setBuilding = function(building) {
	this.setTitle(building.displayName);
	this.viewport.setBuilding(building);
};
