goog.provide('arch.gui.Zoom');

goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 */
arch.gui.Zoom = function(gui, zoomInDom, zoomOutDom) {
	goog.events.EventHandler.call(this);

	var self = this;

	this.gui = gui;

	zoomInDom.click(this.zoomIn.bind(this));
	zoomOutDom.click(this.zoomOut.bind(this));

	this.listen(this.gui.viewport, 'scale', function() {
		zoomInDom.prop('disabled', !self.canZoomIn());
		zoomOutDom.prop('disabled', !self.canZoomOut());
	});
};
goog.mixin(arch.gui.Zoom.prototype, goog.events.EventHandler.prototype);

/**
 * @private
 */
arch.gui.Zoom.prototype.zoomInScale = function() {
	return this.gui.viewport.scale * 1.5;
};

/**
 * @private
 */
arch.gui.Zoom.prototype.zoomOutScale = function() {
	return this.gui.viewport.scale / 1.5;
};


arch.gui.Zoom.prototype.canZoomIn = function() {
	return this.zoomInScale() < 4;
};

arch.gui.Zoom.prototype.canZoomOut = function() {
	return this.zoomOutScale() > .5;
};

arch.gui.Zoom.prototype.zoomIn = function() {
	if(this.canZoomIn()) {
		this.gui.viewport.setScale(this.zoomInScale());
	}
};

arch.gui.Zoom.prototype.zoomOut = function() {
	if(this.canZoomOut()) {
		this.gui.viewport.setScale(this.zoomOutScale());
	}
};
