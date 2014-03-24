goog.provide('arch.gui.building.Button');

goog.require('arch.dom.Disposable');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {!jQuery} parent
 * @param {string} img
 * @param {string} text
 * @param {{
 *   link: string
 * }=} options
 */
arch.gui.building.Button = function(parent, img, text, options) {
	goog.events.EventTarget.call(this);

	var self = this;

	this.dom = $('<a class="icon-button"></a>')
		.append(/** @type {!jQuery} */($('<img>').prop('src', img)))
		.append($('<div></div>').text(text))
		.appendTo(parent)
		.click(function() {
			if(self.isEnabled()) {
				self.dispatchEvent('click');
			}
		});
	if(options && options.link) {
		this.dom.prop('href', options.link)
	}

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};
goog.mixin(arch.gui.building.Button.prototype, goog.events.EventTarget.prototype);

/**
 * @return {boolean}
 */
arch.gui.building.Button.prototype.isEnabled = function() {
	return !this.dom.hasClass('disabled');
};

/**
 * @param {boolean} enabled
 */
arch.gui.building.Button.prototype.setEnabled = function(enabled) {
	if(enabled) {
		this.dom.removeClass('disabled');
	} else {
		this.dom.addClass('disabled');
	}
};
