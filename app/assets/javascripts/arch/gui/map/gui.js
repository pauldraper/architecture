goog.provide('arch.gui.map.Gui');

goog.require('arch.gui.map.BuildingCard');
goog.require('arch.dom');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @param {!jQuery} dom
 */
arch.gui.map.Gui = function(dom) {
	var me = this;

	this.dom = dom;

	this.resizeMap();
	$(window).resize(this.resizeMap.bind(this));

	new arch.gui.map.BuildingCard(
		this,
		'parthenon',
		'Parthenon (Greece)',
		'/assets/images/buildings/parthenon/thumbnail.jpg',
		new goog.math.Coordinate(.6, .2),
		10
	);
	new arch.gui.map.BuildingCard(
		this,
		'great-pyramid',
		'Great Pyramid (Egypt)',
		'/assets/images/buildings/great-pyramid/thumbnail.png',
		new goog.math.Coordinate(.5, .5),
		10
	);
};

arch.gui.map.Gui.prototype.getMapContainer = function() {
	return this.dom.find('.world-map-container');
};

arch.gui.map.Gui.prototype.resizeMap = function() {
	var worldMap = this.getMapContainer();
	arch.dom.scaleToSize(worldMap, arch.dom.getSize($(window)));
	worldMap.css('margin-top', worldMap.height() / -2 + 'px');
};
