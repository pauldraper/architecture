goog.provide('arch.dom');
goog.provide('arch.dom.Disposable');

goog.require('goog.disposable.IDisposable');
goog.require('goog.math.Coordinate');

/**
 * @param {!jQuery} dom
 * @return {!goog.math.Coordinate}
 */
arch.dom.getPosition = function(dom) {
	var position = dom.position();
	return new goog.math.Coordinate(position['left'], position['top']);
};

/**
 * @param {!jQuery} dom
 * @param {!goog.math.Coordinate} position
 */
arch.dom.setPosition = function(dom, position) {
	dom.css({'left':position.x, 'top':position.y});
};

/**
 * @param {!jQuery} dom
 * @return {!goog.math.Coordinate}
 */
arch.dom.getSize = function(dom, size) {
	return new goog.math.Coordinate(
		/** @type {number} */(dom.width()),
		/** @type {number} */(dom.height())
	);
};

/**
 * @param {!jQuery} dom
 * @param {!goog.math.Coordinate} size
 */
arch.dom.setSize = function(dom, size) {
	dom.width(size.x).height(size.y);
};

/**
 * @constructor
 * @implements {goog.disposable.IDisposable}
 * @param {!jQuery} dom
 */
arch.dom.Disposable = function(dom) {
	this.dom = dom;
};

/**
 * @inheritDocs
 */
arch.dom.Disposable.prototype.dispose = function() {
	this.dom.remove();
	this.dom = null;
};

/**
 * @inheritDocs
 */
arch.dom.Disposable.prototype.isDisposed = function() {
	return !this.dom;
};