goog.provide('arch.structs.Map');

/**
 * @constructor
 */
arch.structs.Map = function() {
	/**
	 * @private
	 * @type {!Object}
	 */
	this.map = {};
};

/**
 * @param {*} key
 * @return {*}
 */
arch.structs.Map.prototype.get = function(key) {
	return this.map[this.key(key)];
};

/**
 * @param {*} key
 * @param {*} value
 */
arch.structs.Map.prototype.set = function(key, value) {
	this.map[this.key(key)] = value;
};

/**
 * @param {*} key
 * @return {string}
 */
arch.structs.Map.prototype.key = function(key) {
	return goog.isObject(key) ? goog.getUid(key) : key.toString();
};
