goog.provide('arch.Client');

goog.require('arch.gui.Gui');
goog.require('arch.shape.data');
goog.require('arch.shape.data.parthenon');

/**
 * @constructor
 */
arch.Client = function() {
	this.gui = new arch.gui.Gui($('#main'));

	arch.shape.data.toBuilding(arch.shape.data.parthenon);
};
