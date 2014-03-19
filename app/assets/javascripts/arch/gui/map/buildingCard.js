goog.provide('arch.gui.map.BuildingCard');

goog.require('arch.dom');
goog.require('arch.storage.user');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.events.EventHandler}
 * @param {!arch.gui.map.Gui} gui
 * @param {string} id
 * @param {string} title
 * @param {string} imageUrl
 * @param {goog.math.Coordinate} position
 * @param {number} rotation
 */
arch.gui.map.BuildingCard = function(gui, id, title, imageUrl, position, rotation) {
	var me = this;

	this.gui = gui;
	this.id = id;

	this.dom = /** @type {!jQuery} */(
		$('<a class="card"></a>')
		.attr('href', '/buildings/' + encodeURIComponent(this.id))
		.css({
			'top': position.y * 100 + '%',
			'left': position.x * 100 + '%',
		})
	);
	$('<img class="card-image">').attr('src', imageUrl).appendTo(this.dom);
	$('<div class="card-title"></div>').text(title).appendTo(this.dom);
	if(arch.storage.user.buildings.isFinished(id)) {
		$('<div class="check"></div>').appendTo(this.dom);
	}
	this.dom.appendTo(gui.getMapContainer());
	this.dom.css({
		'margin-top': this.dom.height() / -2 + 'px',
		'margin-left': this.dom.width() / -2 + 'px',
	});

	this.registerDisposable(new arch.dom.Disposable(this.dom));
};
goog.mixin(arch.gui.map.BuildingCard.prototype, goog.events.EventHandler.prototype);
