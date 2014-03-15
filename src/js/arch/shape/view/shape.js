goog.provide('arch.shape.view.Shape');

goog.require('arch.dom');
goog.require('arch.dom.Disposable');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!jQuery} parent
 * @param {!arch.shape.Shape} model
 */
arch.shape.view.Shape = function(parent, model) {
	goog.events.EventHandler.call(this);

	var self = this;

	/** @const **/
	this.model = model;

	/** @type {!jQuery} */
	this.dom;
	this.build(parent);

	this.listen(this.model, 'position', function (position) {
		arch.dom.setPosition(self.dom, position);
	});
};
goog.mixin(arch.shape.view.Shape.prototype, goog.events.EventHandler.prototype);

/**
 * @param {!jQuery} parent
 */
arch.shape.view.Shape.prototype.build = function(parent) {
	var self = this;

	var img = /** @type {!jQuery} */($('<img>').prop('src', this.model.url));
	arch.dom.setSize(img, this.model.size);
	this.dom = $('<div class="shape"></div>').draggable({
		'start': function() {
			self.dom.css('opacity', '.8');
		},
		'stop': function() {
			self.dom.css('opacity', '');
			self.model.setPosition(arch.dom.getPosition($(this)));
			var c = self.model.closestConnections();
			if(c.a.distance(c.b) < 30) {
				c.a.connect(c.b);
			}
		},
		'containment': 'document'
	}).append(img).appendTo(parent);

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};

arch.shape.view.Shape.prototype.destroy = function() {
	this.dom.remove();
};
