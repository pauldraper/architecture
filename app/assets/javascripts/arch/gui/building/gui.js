goog.provide('arch.gui.building.Gui');

goog.require('arch.gui.building.Sidebar');
goog.require('arch.gui.building.Viewport');
goog.require('arch.gui.common.Gui');

/**
 * @constructor
 * @extends {arch.gui.common.Gui}
 * @param {!jQuery} dom
 */
arch.gui.building.Gui = function(dom) {
	arch.gui.common.Gui.call(this, dom);

	var me = this;

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
goog.mixin(arch.gui.building.Gui.prototype, arch.gui.common.Gui.prototype);
