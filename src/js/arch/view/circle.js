goog.provide('arch.view.Circle');

goog.require('arch.dom');
goog.require('arch.math.Point');

/**
 * @constructor
 * @param {!jQuery} parent
 * @param {number} size
 * @param {string} color
 * @param {?Object=} options
 */
arch.view.Circle = function(parent, size, options) {
	this.dom = $('<div class="circle"></div>').width(size).height(size).appendTo(parent);
	
	if(options) {
		if(options.css) {
			this.dom.css(options.css);
		}
		if(options.position) {
			this.setPosition(options.position);
		}
		if(options.hidden) {
			this.hide();
		}
	}
};

/**
 * @param {arch.math.Point}
 */
arch.view.Circle.prototype.setPosition = function(position) {
	arch.dom.setPosition(this.dom, position);
};

arch.view.Circle.prototype.show = function() {
	this.dom.show();
};

arch.view.Circle.prototype.hide = function() {
	this.dom.hide();
};

arch.view.Circle.prototype.destroy = function() {
	this.dom.remove();
};