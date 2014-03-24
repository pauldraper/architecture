goog.provide('arch.gui.building.Gui');

goog.require('arch.gui.building.Sidebar');
goog.require('arch.gui.building.Viewport');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.gui.building.Gui = function(dom) {
	var me = this;

	this.dom = dom;

	this.viewport = new arch.gui.building.Viewport(this);

	this.sidebar = new arch.gui.building.Sidebar(this);
};

arch.gui.building.Gui.prototype.setTitle = function(title) {
	this.dom.children('.title-bar').text(title);
};


arch.gui.building.Gui.prototype.setBuilding = function(building) {
	this.setTitle(building.displayName);
	this.viewport.setBuilding(building);
};
