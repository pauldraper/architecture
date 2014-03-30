goog.provide('arch.shape.view.Building');

goog.require('arch.async');
goog.require('arch.dom.Disposable');
goog.require('arch.gui.common.Dialog');
goog.require('arch.shape.view.Shape');
goog.require('arch.structs.Map');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!arch.gui.building.Viewport} viewport
 * @param {!arch.shape.Building} model
 */
arch.shape.view.Building = function(viewport, model) {
	goog.events.EventHandler.call(this);

	/** @const */
	this.viewport = viewport;

	/** @const */
	this.model = model;

	/** @type {!jQuery} */
	this.dom;
	this.build(viewport.dom);

	/** @const */
	this.shapes = this.model.shapes.map(function(shape) {
		return new arch.shape.view.Shape(viewport, shape);
	});
	this.shapes.forEach(function(shape) {
		this.registerDisposable(shape);
	}, this);

	/** @const **/
	this.shapeMap = new arch.structs.Map;
	this.shapes.forEach(function(shape) {
		this.shapeMap.set(shape.model, shape);
	}, this);
};
goog.mixin(arch.shape.view.Building.prototype, goog.events.EventHandler.prototype);

/**
 * @param {!jQuery} parent
 */
arch.shape.view.Building.prototype.build = function(parent) {
	this.dom = $('<div class="building"></div>').appendTo(parent);
	this.registerDisposable(new arch.dom.Disposable(this.dom));
};

/**
 * @return {arch.shape.view.Shape}
 */
arch.shape.view.Building.prototype.getView = function(model) {
	return /** @type {arch.shape.view.Shape} */(this.shapeMap.get(model) || null);
};

arch.shape.view.Building.prototype.shuffle = function() {
	this.model.shapes.forEach(function(shape) {
		var x = Math.random() * (this.viewport.bounds.width - shape.size.x) + this.viewport.bounds.left;
		var y = Math.random() * (this.viewport.bounds.height - shape.size.y) + this.viewport.bounds.top;
		shape.setPosition(new goog.math.Coordinate(x, y));
	}, this);
};

/**
 * @param {function()=} done
 */
arch.shape.view.Building.prototype.showPreview = function(done) {
	var usedPositions = []; // TODO: make better than O(n^2)

	var asyncs = this.shapes.map(function(shape) {
		var correctPosition = goog.array.find(shape.model.getCorrectPositions(), function(position) {
			var used = usedPositions.some(function(usedPosition) {
				return goog.math.Coordinate.equals(position, usedPosition);
			});
			if(!used) {
				usedPositions.push(position);
				return true;
			}
			return false;
		});

		return function(done) {
			var position = shape.model.getPosition();
			shape.animateTo(correctPosition, function() {
				setTimeout(function() {
					shape.animateTo(position, done);
				}, 750);
			});
		};
	});
	arch.async.parallel(asyncs)(done);
};

arch.shape.view.Building.prototype.showIntroductionDialog = function() {
	new arch.gui.common.Dialog(this.viewport.gui, 'Your assignment', this.model.beforeMessage, 650);
};

arch.shape.view.Building.prototype.showFinishedDialog = function() {
	new arch.gui.common.Dialog(this.viewport.gui, 'Congratulations!', this.model.afterMessage, 650);
};
