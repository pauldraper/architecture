goog.provide('arch.gui.building.Viewport');

goog.require('arch.dom.Disposable');
goog.require('arch.math.Coordinate');
goog.require('arch.math.Rect');
goog.require('arch.shape.view.Building');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {!arch.gui.building.Gui} gui
 */
arch.gui.building.Viewport = function(gui) {
	goog.events.EventTarget.call(this);

	var self = this;

	this.gui = gui;

	/** @type {boolean} */
	this.dragEnabled = true;

	/** @type {boolean} */
	this.stickyShapes = true;

	/**
	 * @type {?{
	 *   anchor: !goog.math.Coordinate,
	 *   bounds: !goog.math.Rect,
	 *   shapes: !Array.<{shape:!arch.shape.view.Shape, originalPosition:!goog.math.Coordinate}>
	 * }}
	 */
	this.dragInfo = null;

	/** @type {!jQuery} */
	this.dom = $('<div class="viewport"></div>').appendTo(gui.dom).mousedown(function(e) {
		if(!self.dragEnabled) {
			return;
		}
		if(self.dragInfo) {
			self.dragInfo.shapes.forEach(function(obj) {
				obj.shape.stopMove();
			});
		}
		var position = self.fromEventPosition(e);
		var shape = self.getShapeAt(position);
		if(shape) {
			$(this).removeClass('cursor-grab').addClass('cursor-grabbing');
			var shapes = self.stickyShapes ? shape.model.getSnapped() : [shape.model];
			var shapeData = shapes.map(function(shape) {
				return {
					shape: self.building.getView(shape),
					originalPosition: shape.getPosition(), // for rounding errors?
				};
			});
			self.dragInfo = {
				anchor: position,
				bounds: arch.math.Rect.combine(shapes.map(function(shape) {
					return shape.getBounds();
				})),
				shapes: shapeData
			};
			shapeData.forEach(function(obj) {
				obj.shape.startMove();
			});
		}
	}).mousemove(function(e) {
		var position = self.fromEventPosition(e);
		if(self.dragInfo) {
			var visibleBounds = self.getVisibleBounds();
			var offsetBounds = new goog.math.Rect(
				visibleBounds.left - self.dragInfo.bounds.left,
				visibleBounds.top - self.dragInfo.bounds.top,
				visibleBounds.width - self.dragInfo.bounds.width,
				visibleBounds.height - self.dragInfo.bounds.height
			);
			var offset = arch.math.Coordinate.clamp(
				goog.math.Coordinate.difference(position, self.dragInfo.anchor),
				offsetBounds
			);
			self.dragInfo.shapes.forEach(function(obj) {
				obj.shape.model.setPosition(goog.math.Coordinate.sum(offset, obj.originalPosition));
			});
		} else if(self.getShapeAt(position)) {
			$(this).addClass('cursor-grab').removeClass('cursor-grabbing');
		} else {
			$(this).removeClass('cursor-grab').removeClass('cursor-grabbing');
		}
	}).mouseup(function() {
		if(self.dragInfo) {
			var shapeModels = self.dragInfo.shapes.map(function(obj) {
				return obj.shape.model;
			})
			var obj = arch.array.minElement(arch.array.flatMap(shapeModels, function(shape) {
				var c = shape.closestConnection(shapeModels);
				return c ? [{
					shape: shape,
					connection: c,
				}] : [];
			}), function(obj) {
				return obj.connection.getAccuracy();
			});
			if(obj && obj.connection.getAccuracy() < 60) {
				var other = obj.connection.other(obj.shape);
				var offset = goog.math.Coordinate.difference(obj.shape.getCorrectOffset(other), obj.shape.getOffset(other));
				var consistent = other.getSnapped().every(function(other) {
					return shapeModels.every(function(shape) {
						return goog.math.Coordinate.distance(
							offset,
							goog.math.Coordinate.difference(shape.getCorrectOffset(other), shape.getOffset(other))
						) < 5;
					});
				});
				if(consistent) {
					self.dragInfo.shapes.forEach(function(obj) {
						obj.shape.model.offset(offset);
					});
					if(self.building.model.isFinished()) {
						self.dispatchEvent('finish');
					}
				}
			}
			self.dragInfo.shapes.forEach(function(obj) {
				obj.shape.stopMove();
			});
			self.dragInfo = null;
			$(this).addClass('cursor-grab').removeClass('cursor-grabbing');
		}
	});
	this.registerDisposable(new arch.dom.Disposable(this.dom));

	/** @type {arch.shape.view.Building} */
	this.building = null;

	this.scale = 1;

	this.offset = new goog.math.Coordinate;

	/** @type {goog.math.Rect} */
	this.bounds = null;

	$(window).resize(function() {
		self.refreshOffset();
	});

	// TODO: do this differently
	$('#shuffle').click(function() {
		self.building.shuffle();
	});
};
goog.mixin(arch.gui.building.Viewport.prototype, goog.events.EventTarget.prototype);

arch.gui.building.Viewport.prototype.fromEventPosition = function(e) {
	var domPosition = goog.math.Coordinate.difference(new goog.math.Coordinate(e.pageX, e.pageY), arch.dom.getDocumentPosition(this.dom));
	return this.fromDomPosition(domPosition);
};

arch.gui.building.Viewport.prototype.setBuilding = function(building) {
	this.building = new arch.shape.view.Building(this, building);

	var bounds = this.building.model.getCorrectBounds();
	var center = bounds.getCenter();
	this.bounds = bounds.translate(center.clone().scale(-1)).scale(1.5).translate(center);
	this.refreshOffset();
	this.setScale(Math.min(this.dom.width() / this.bounds.width, this.dom.height() / this.bounds.height));

	this.building.shuffle();
};

/**
 * @param {number} scale
 */
arch.gui.building.Viewport.prototype.setScale = function(scale) {
	this.scale = scale;
	this.refreshOffset();
	this.dispatchEvent('scale');
};

arch.gui.building.Viewport.prototype.refreshOffset = function() {
	this.offset = this.bounds.getCenter().scale(-this.scale).translate(this.dom.width() / 2, this.dom.height() / 2);
	this.dispatchEvent('offset');
};

/**
 * @param {!goog.math.Coordinate} position
 */
arch.gui.building.Viewport.prototype.toDomPosition = function(position) {
	return goog.math.Coordinate.sum(this.toDomSize(position), this.offset);
};

/**
 * @param {!goog.math.Coordinate} size
 */
arch.gui.building.Viewport.prototype.toDomSize = function(size) {
	return size.clone().scale(this.scale);
};

/**
 * @param {!goog.math.Coordinate} position
 */
arch.gui.building.Viewport.prototype.fromDomPosition = function(position) {
	return this.fromDomSize(goog.math.Coordinate.difference(position, this.offset));
};

/**
 * @param {!goog.math.Coordinate} size
 */
arch.gui.building.Viewport.prototype.fromDomSize = function(size) {
	return size.clone().scale(1 / this.scale);
};

arch.gui.building.Viewport.prototype.getVisibleBounds = function() {
	var position = this.fromDomPosition(new goog.math.Coordinate);
	var size = this.fromDomSize(new goog.math.Coordinate(/** @type {number} */(this.dom.width()), /** @type {number} */(this.dom.height())));
	return new goog.math.Rect(position.x, position.y, size.x, size.y);
};

arch.gui.building.Viewport.prototype.getCenter = function() {
	return this.fromDomSize(new goog.math.Coordinate(this.dom.width() / 2, this.dom.height() / 2));
};

/**
 * @param {!goog.math.Coordinate} position
 * @return {arch.shape.view.Shape}
 */
arch.gui.building.Viewport.prototype.getShapeAt = function(position) {
	var shape = null;
	this.building.shapes.forEach(function(view) {
		if((!shape || shape.dom.zIndex() <= view.dom.zIndex()) && view.hitTest(position)) {
			shape = view;
		}
	});
	return shape;
};

arch.gui.building.Viewport.prototype.maxZIndex = function() {
	return Math.max.apply(Math, this.building.shapes.map(function(shape) {
		return shape.dom.zIndex();
	}));
};

arch.gui.building.Viewport.prototype.showPreview = function() {
	var self = this;

	if(!self.dragEnabled) { // double-click protection; TODO: is there a better way?
		return;
	}

	this.dragEnabled = false;
	this.building.finish(false, function() {
		self.dragEnabled = true;
	});
};
