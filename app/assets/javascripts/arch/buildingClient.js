goog.provide('arch.BuildClient');

goog.require('arch.gui.Gui');
goog.require('arch.shape.data');

/**
 * @constructor
 */
arch.BuildClient = function() {
	this.gui = new arch.gui.Gui($('#gui'));
};

/**
 * @param {!Object}
 */
arch.BuildClient.prototype.setBuildingData = function(data) {
	var building = arch.shape.data.toBuilding(data);
	this.gui.setBuilding(building);
};
