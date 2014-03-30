goog.provide('arch.gui.map.Gui');

goog.require('arch.gui.common.Gui');
goog.require('arch.gui.common.Dialog');
goog.require('arch.gui.map.BuildingCard');
goog.require('arch.dom');
goog.require('goog.math.Coordinate');

/**
 * @constructor
 * @extends {arch.gui.common.Gui}
 * @param {!jQuery} dom
 */
arch.gui.map.Gui = function(dom) {
	arch.gui.common.Gui.call(this, dom);

	this.resizeMap();
	$(window).resize(this.resizeMap.bind(this));

	new arch.gui.map.BuildingCard(
		this,
		'parthenon',
		'Parthenon (Greece)',
		'/assets/images/buildings/parthenon/thumbnail.jpg',
		new goog.math.Coordinate(.6, .18),
		10
	);
	new arch.gui.map.BuildingCard(
		this,
		'great-pyramid',
		'Great Pyramid (Egypt)',
		'/assets/images/buildings/great-pyramid/thumbnail.png',
		new goog.math.Coordinate(.54, .5),
		10
	);
	new arch.gui.map.BuildingCard(
		this,
		'pont-du-gard',
		'Pont du Gard (Roman Empire)',
		'/assets/images/buildings/pont-du-gard/thumbnail.png',
		new goog.math.Coordinate(.38, .1),
		10
	);
	new arch.gui.map.BuildingCard(
		this,
		'tikal-temple',
		'Temple of the Great Jaguar',
		'/assets/images/buildings/tikal-temple/thumbnail.png',
		new goog.math.Coordinate(.2, .4),
		10
	);

	if(!arch.storage.user.messages.hasShownIntro()) {
		this.dialog = new arch.gui.common.Dialog(
			this,
			'Welcome!',
			'Become the greatest architect of the ancient world!\nTo get started, choose one the buildings on the map.',
			500
		);
		this.listenOnce(this.dialog, 'close', function() {
			this.dialog = null;
			arch.storage.user.messages.setShownIntro();
		});
	}
};
goog.inherits(arch.gui.map.Gui, arch.gui.common.Gui);

arch.gui.map.Gui.prototype.getMapContainer = function() {
	return this.dom.find('.world-map-container');
};

arch.gui.map.Gui.prototype.resizeMap = function() {
	var worldMap = this.getMapContainer();
	var windowSize = arch.dom.getSize($(window))
	arch.dom.scaleToSize(worldMap, new goog.math.Coordinate(Math.max(windowSize.x, 1200), Math.max(windowSize.y, 800)));
	worldMap.css('margin-top', worldMap.height() / -2 + 'px');
};
