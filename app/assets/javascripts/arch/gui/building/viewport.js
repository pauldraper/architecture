goog.provide('arch.gui.building.Viewport');

goog.require('arch.dom.Disposable');
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

	this.dragEnabled = true;

	/**
	 * @type {?{
	 *   anchor: !goog.math.Coordinate,
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
		var position = self.fromDomPosition(self.eventDomPosition(e));
		var shape = self.getShapeAt(position);
		if(shape) {
			$(this).removeClass('cursor-grab').addClass('cursor-grabbing');
			var shapes = shape.model.getSnapped().map(function(shape) {
				return {
					shape: self.building.getView(shape),
					originalPosition: shape.getPosition(), // for rounding errors?
				};
			});
			self.dragInfo = {
				anchor: position,
				shapes: shapes
			};
			self.dragInfo.shapes.forEach(function(obj) {
				obj.shape.startMove();
			});
		}
	}).mousemove(function(e) {
		var position = self.fromDomPosition(self.eventDomPosition(e));
		if(self.dragInfo) {
			var offset = goog.math.Coordinate.difference(position, self.dragInfo.anchor);
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
			if(obj && obj.connection.getAccuracy() < 50) {
				var other = obj.connection.other(obj.shape);
				var offset = goog.math.Coordinate.difference(obj.shape.getCorrectOffset(other), obj.shape.getOffset(other));
				self.dragInfo.shapes.forEach(function(obj) {
					obj.shape.model.offset(offset);
				});
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

	// TODO: do something different
	$('#shuffle').click(function() {
		self.building.shuffle();
	});
};
goog.mixin(arch.gui.building.Viewport.prototype, goog.events.EventTarget.prototype);

arch.gui.building.Viewport.prototype.eventDomPosition = function(e) {
	return goog.math.Coordinate.difference(new goog.math.Coordinate(e.pageX, e.pageY), arch.dom.getDocumentPosition(this.dom));
};

arch.gui.building.Viewport.prototype.setBuilding = function(building) {
	this.building = new arch.shape.view.Building(this, building);
	this.building.shuffle();
};

/**
 * @param {number} scale
 */
arch.gui.building.Viewport.prototype.setScale = function(scale) {
	var oldCenter = this.toDomPosition(new goog.math.Coordinate);
	this.scale = scale;
	var newCenter = this.toDomPosition(new goog.math.Coordinate);
	//TODO: fix
	this.offset = goog.math.Coordinate.sum(this.offset, goog.math.Coordinate.difference(newCenter, oldCenter));
	this.dispatchEvent('scale');
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
	return goog.math.Coordinate.difference(this.fromDomSize(position), this.offset);
};

/**
 * @param {!goog.math.Coordinate} size
 */
arch.gui.building.Viewport.prototype.fromDomSize = function(size) {
	return size.clone().scale(1 / this.scale);
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
	this.building.showPreview(function() {
		self.dragEnabled = true;
	});
};
