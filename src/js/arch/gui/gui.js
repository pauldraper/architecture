goog.provide('arch.gui.Gui');

goog.require('arch.shape.data');
goog.require('arch.shape.data.parthenon');
goog.require('arch.shape.view.Building');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!jQuery} dom
 */
arch.gui.Gui = function(dom) {
	this.dom = dom;

	var parthenon = arch.shape.data.toBuilding(arch.shape.data.parthenon);
	var view = new arch.shape.view.Building(dom, parthenon);
	view.shuffle();
};
