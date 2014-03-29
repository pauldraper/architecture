goog.provide('arch.gui.common.Dialog');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {string} title
 * @param {string} content
 */
arch.gui.common.Dialog = function(gui, title, content) {
	goog.events.EventTarget.call(this);

	var self = this;

	this.dom = $('<div class="dialog-overlay"></div>');
	$('<div class="dialog"></div>')
		.append($('<div class="dialog-title"></div>').text(title))
		.append($(
			'<div class="dialog-body">'
				+ '<div class="dialog-content"></div>'
				+ '<div class="dialog-buttons">'
					+ '<div class="button button-primary">Okay</div>'
				+ '</div>'
			+ '</div>'
		))
		.append($('<div class="dialog-close-button"><div class="close-icon-light"></div></div>'))
		.appendTo(this.dom);

	this.dom.find('.dialog-content').html(content);

	this.dom.find('.button-primary, .dialog-close-button').click(function() {
		self.dispatchEvent('close');
	});

	this.dom.appendTo(gui.dom);

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};
goog.mixin(arch.gui.common.Dialog.prototype, goog.events.EventTarget.prototype);

arch.gui.common.Dialog.prototype.show = function(done) {
	this.dom.fadeIn(100, done && done.bind(this));
};

arch.gui.common.Dialog.prototype.hide = function(done) {
	this.dom.fadeOut(100, done && done.bind(this));
};

arch.gui.common.Dialog.prototype.hideAndDispose = function() {
	this.hide(function() {
		this.dispose();
	});
};
