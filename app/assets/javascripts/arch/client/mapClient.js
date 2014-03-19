goog.provide('arch.client.MapClient');

goog.require('arch.gui.map.Gui');
goog.require('arch.shape.data');

/**
 * @constructor
 */
arch.client.MapClient = function() {
	this.gui = new arch.gui.map.Gui($('#gui'));
};
