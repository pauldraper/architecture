goog.provide('arch.main');

goog.require('arch.Client');

goog.require('goog.events.EventWrapper');
goog.require('goog.debug.ErrorHandler');

$(function() {
	var client = new arch.Client;
	goog.exportSymbol('client', client);
});
