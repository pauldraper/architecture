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

	var img = /** @type {!jQuery} */($('<img draggable="false">').prop('src', this.model.url));
	this.dom = $('<div class="shape"></div>').append(img).appendTo(parent);
	this.refreshSize()

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};

arch.shape.view.Shape.prototype.hitTest = function(position) {
	return this.model.hitTest(position);
};

arch.shape.view.Shape.prototype.startMove = function() {
	this.dom.css('opacity', '.7');
	this.dom.css('z-index', '10');
};

arch.shape.view.Shape.prototype.move = function(position) {
	this.model.setPosition(position);
};

arch.shape.view.Shape.prototype.stopMove = function() {
	this.dom.css('opacity', '1');
	this.dom.css('z-index', '');
	var c = this.model.closestConnection();
	if(c.getAccuracy() < 50) {
		this.model.snapTo(c.other(this.model));
	}
};

arch.shape.view.Shape.prototype.refreshSize = function() {
	arch.dom.setSize(this.dom.find('img'), this.viewport.toDomSize(this.model.size));
};

arch.shape.view.Shape.prototype.refreshPosition = function() {
	arch.dom.setPosition(this.dom, this.viewport.toDomPosition(this.model.position));
};

arch.shape.view.Shape.prototype.destroy = function() {
	this.dom.remove();
};
