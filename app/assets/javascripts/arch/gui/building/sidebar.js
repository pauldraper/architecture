goog.provide('arch.gui.building.Sidebar');

goog.require('arch.gui.building.Button');
goog.require('goog.array');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!arch.gui.building.Gui} gui
 */
arch.gui.building.Sidebar = function(gui) {
	goog.events.EventHandler.call(this);

	this.gui = gui;

	this.dom = $('<div class="sidebar"></div>').appendTo(this.gui.dom);

	this.mapButton = new arch.gui.building.Button(this.dom, "/assets/images/buttons/map-icon.png", "Back to map", {link: "/"});
	this.registerDisposable(this.mapButton);

	this.showPreviewButton = new arch.gui.building.Button(this.dom, "/assets/images/buttons/lightbulb-icon.png", "Show hint");
	this.listen(this.showPreviewButton, 'click', function() {
		this.gui.viewport.showPreview();
	});
	this.registerDisposable(this.showPreviewButton);

	this.zoomInButton = new arch.gui.building.Button(this.dom, "/assets/images/buttons/zoom-in-icon.png", "Zoom in");
	this.listen(this.zoomInButton, 'click', this.zoomIn);
	this.registerDisposable(this.zoomInButton);

	this.zoomOutButton = new arch.gui.building.Button(this.dom, "/assets/images/buttons/zoom-out-icon.png", "Zoom out");
	this.listen(this.zoomOutButton, 'click', this.zoomOut);
	this.registerDisposable(this.zoomOutButton);

	this.shuffleButton = new arch.gui.building.Button(this.dom, "/assets/images/buttons/shuffle-icon.png", "Re-scramble");
	this.listen(this.shuffleButton, 'click', function() {
		this.gui.viewport.building.shuffle();
	});
	this.registerDisposable(this.shuffleButton);

	$('<a class="icon-button"></a>')
		.append($('<input type="checkbox">'))
		.append($('<div></div>').text('Sticky pieces'))
		.appendTo(this.dom);

	this.listen(this.gui.viewport, 'scale', function() {
		this.zoomInButton.setEnabled(this.canZoomIn());
		this.zoomOutButton.setEnabled(this.canZoomOut());
	});

	this.zoomLevels = [
		.5,
		.75,
		1,
		1.5,
		2,
	];
};
goog.mixin(arch.gui.building.Sidebar.prototype, goog.events.EventHandler.prototype);

/**
 * @private
 * @return {number}
 */
arch.gui.building.Sidebar.prototype.zoomLevelIndex = function() {
	var i = goog.array.binarySearch(this.zoomLevels, this.gui.viewport.scale);
	if(i < 0) {
		i = -i - 1;
	}
	return i;
};

arch.gui.building.Sidebar.prototype.canZoomIn = function() {
	return this.zoomLevelIndex() < this.zoomLevels.length;
};

arch.gui.building.Sidebar.prototype.canZoomOut = function() {
	return this.zoomLevelIndex() > 0;
};

arch.gui.building.Sidebar.prototype.zoomIn = function() {
	if(this.canZoomIn()) {
		var scale = this.zoomLevels[this.zoomLevelIndex() + 1];
		this.gui.viewport.setScale(scale);
	}
};

arch.gui.building.Sidebar.prototype.zoomOut = function() {
	if(this.canZoomOut()) {
		var scale = this.zoomLevels[this.zoomLevelIndex() - 1];
		this.gui.viewport.setScale(scale);
	}
};
