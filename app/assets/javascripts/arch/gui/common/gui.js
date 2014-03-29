goog.provide('arch.gui.common.Gui');

goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!jQuery} dom
 */
arch.gui.common.Gui = function(dom) {
	goog.events.EventHandler.call(this);

	this.dom = dom;
};
goog.mixin(arch.gui.common.Gui.prototype, goog.events.EventHandler.prototype);
