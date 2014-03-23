goog.provide('arch.building');

goog.require('arch.client.BuildingClient');
goog.require('goog.events.EventWrapper');
goog.require('goog.debug.ErrorHandler');

goog.exportSymbol("arch.client.BuildingClient", arch.client.BuildingClient);
goog.exportProperty(arch.client.BuildingClient.prototype, "setBuildingData", arch.client.BuildingClient.prototype.setBuildingData);
goog.exportProperty(arch.client.BuildingClient.prototype, "showPreview", arch.client.BuildingClient.prototype.showPreview);
