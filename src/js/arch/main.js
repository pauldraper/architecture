goog.provide('arch.main');

goog.require('arch.Client');

$(function() {
	var client = new arch.Client;
	goog.exportSymbol('client', client);
});
