goog.provide('arch.shape.Shape');

goog.require('arch.dom');
goog.require('arch.math.Point');
goog.require('arch.view.Circle');

/**
 * @constructor
 * @param {string} url
 */
arch.shape.Shape = function(url) {
	var self = this;

	/** @type {!Array.<arch.view.Circle>} */
	this.hints = [];

	/** @type {!jQuery} */
	this.dom = $('<div class="shape"></div>').draggable({
		'drag': function(event) {
			// self.showHints();
		},
		'stop': function() {
			// self.hideHints();
		},
		'containment': 'document'
	}).mousedown(function() {
		self.showHints();
	}).mouseup(function() {
		self.hideHints();
	}).append($('<img>').prop('src', url));

	this.buildHints();
	this.hideHints();
};

/**
 * @return {!Array.<arch.math.Point>}
 */
arch.shape.Shape.prototype.getHintPositions = function() {
	return [];
};

arch.shape.Shape.prototype.buildHints = function() {
	this.hints.forEach(function(hint) {
		hint.destroy();
	})
	this.hints = this.getHintPositions().map(function(position) {
		return new arch.view.Circle(this.dom, 10, {
			css: {'background-color':'#006600', 'opacity':'.8'},
			position: arch.math.Point.add(position)
		});
	}, this);
}

/**
 * @param {arch.math.Circle} position
 * @private
 */
arch.shape.Shape.prototype.showHints = function() {
	this.hints.forEach(function(hint) {
		hint.show();
	});
};

/**
 * @private
 */
arch.shape.Shape.prototype.hideHints = function() {
	this.hints.forEach(function(hint) {
		hint.hide();
	});
}