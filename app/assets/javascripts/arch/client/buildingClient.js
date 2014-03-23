goog.provide('arch.client.BuildingClient');

goog.require('arch.gui.building.Gui');
goog.require('arch.shape.data');

/**
 * @constructor
 */
arch.client.BuildingClient = function() {
	this.gui = new arch.gui.building.Gui($('#gui'));
};

/**
 * @param {!Object} data
 */
arch.client.BuildingClient.prototype.setBuildingData = function(data) {
	var building = arch.shape.data.toBuilding(data);
	this.gui.setBuilding(building);
};

arch.client.BuildingClient.prototype.showPreview = function() {
	this.gui.viewport.showPreview();
};
