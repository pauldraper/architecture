goog.provide('arch.main');

goog.require('arch.BuildClient');

goog.require('goog.events.EventWrapper');
goog.require('goog.debug.ErrorHandler');

goog.exportSymbol("arch.BuildClient", arch.BuildClient);
goog.exportProperty(arch.BuildClient.prototype, "setBuildingData", arch.BuildClient.prototype.setBuildingData);
