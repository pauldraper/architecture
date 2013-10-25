goog.provide('arch.Client');

goog.require('arch.Gui');
goog.require('arch.shape.roman');

/**
 * @constructor
 */
arch.Client = function() {
	this.gui = new arch.Gui($(document.body));

	this.gui.toolbox.addShape(new arch.shape.roman.Column);
	this.gui.toolbox.addShape(new arch.shape.roman.Column);
	this.gui.toolbox.addShape(new arch.shape.roman.Column);
};
