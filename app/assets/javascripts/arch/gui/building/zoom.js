goog.provide('arch.gui.building.Zoom');

goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 */
arch.gui.building.Zoom = function(gui, zoomInDom, zoomOutDom) {
	goog.events.EventHandler.call(this);

	var self = this;

	this.gui = gui;

	zoomInDom.click(this.zoomIn.bind(this));
	zoomOutDom.click(this.zoomOut.bind(this));

	this.listen(this.gui.viewport, 'scale', function() {
		if(self.canZoomIn()) {
			zoomInDom.removeClass('disabled');
		} else {
			zoomInDom.addClass('disabled');
		}
		if(self.canZoomOut()) {
			zoomOutDom.removeClass('disabled');
		} else {
			zoomOutDom.addClass('disabled');
		}
	});
};
goog.mixin(arch.gui.building.Zoom.prototype, goog.events.EventHandler.prototype);

/**
 * @private
 */
arch.gui.building.Zoom.prototype.zoomInScale = function() {
	return this.gui.viewport.scale * 1.5;
};

/**
 * @private
 */
arch.gui.building.Zoom.prototype.zoomOutScale = function() {
	return this.gui.viewport.scale / 1.5;
};


arch.gui.building.Zoom.prototype.canZoomIn = function() {
	return this.zoomInScale() < 4;
};

arch.gui.building.Zoom.prototype.canZoomOut = function() {
	return this.zoomOutScale() > .5;
};

arch.gui.building.Zoom.prototype.zoomIn = function() {
	if(this.canZoomIn()) {
		this.gui.viewport.setScale(this.zoomInScale());
	}
};

arch.gui.building.Zoom.prototype.zoomOut = function() {
	if(this.canZoomOut()) {
		this.gui.viewport.setScale(this.zoomOutScale());
	}
};
