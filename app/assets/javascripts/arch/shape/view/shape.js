goog.provide('arch.shape.view.Shape');

goog.require('arch.dom');
goog.require('arch.dom.Disposable');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!arch.gui.building.Viewport} viewport
 * @param {!arch.shape.Shape} model
 */
arch.shape.view.Shape = function(viewport, model) {
	goog.events.EventHandler.call(this);

	var self = this;

	/** @const **/
	this.model = model;

	/** @const **/
	this.viewport = viewport;

	/** @type {!jQuery} */
	this.dom;
	this.build(viewport.dom);

	this.listen(this.model, 'position', function() {
		self.refreshPosition();
	});
	this.listen(this.viewport, 'scale', function() {
		self.refreshPosition();
		self.refreshSize();
	});
};
goog.mixin(arch.shape.view.Shape.prototype, goog.events.EventHandler.prototype);

/**
 * @param {!jQuery} parent
 */
arch.shape.view.Shape.prototype.build = function(parent) {
	var self = this;

	var img = /** @type {!jQuery} */($('<img>').prop('src', this.model.url));;
	this.dom = $('<div class="shape"></div>').append(img).appendTo(parent).mousedown(function() {
		self.dom.css('opacity', '.7');
	}).mouseup(function() {
		self.dom.css('opacity', '');
	})['draggable']({
		'start': function() {
			self.model.disconnect();
		},
		'stop': function() {
			self.dom.css('opacity', '');
			self.model.setPosition(arch.dom.getPosition($(this)));
			var c = self.model.closestConnections();
			if(c && c.a.distance(c.b) < 50) {
				c.a.connect(c.b);
				self.emphasize();
			}
		},
		'containment': parent
	});
	self.refreshSize()

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};

arch.shape.view.Shape.prototype.refreshSize = function() {
	arch.dom.setSize(this.dom.find('img'), this.viewport.toDOMSize(this.model.size));
};

arch.shape.view.Shape.prototype.refreshPosition = function() {
	arch.dom.setPosition(this.dom, this.viewport.toDOMPosition(this.model.position));
};

arch.shape.view.Shape.prototype.destroy = function() {
	this.dom.remove();
};

arch.shape.view.Shape.prototype.emphasize = function() {
	//TODO
};
