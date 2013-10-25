goog.provide('arch.Gui');

goog.require('arch.Toolbox');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.Gui = function(dom) {
	this.dom = dom;

	this.toolbox = new arch.Toolbox(this.dom);
};
