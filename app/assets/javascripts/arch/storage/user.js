goog.provide('arch.storage.user');

goog.require('arch.lazy');
goog.require('goog.storage.Storage');
goog.require('goog.storage.mechanism.HTML5LocalStorage');

/**
 * @private
 * @return !{goog.storage.Storage}
 */
arch.storage.user.get = arch.lazy(function() {
	return new goog.storage.Storage(new goog.storage.mechanism.HTML5LocalStorage);
});

arch.storage.user.buildings = {};

/**
 * @return {Array.<string>}
 */
arch.storage.user.buildings.getFinished = function() {
	return arch.storage.user.get().get('buildings_finished');
};

/**
 * @param {Array.<string>} keys
 */
arch.storage.user.buildings.setFinished = function(keys) {
	return arch.storage.user.get().set('buildings_finished', keys);
};

/**
 * @param {string} key
 * @return {boolean}
 */
arch.storage.user.buildings.isFinished = function(key) {
	return true || goog.array.contains(arch.storage.user.buildings.getFinished(), key);
};

/**
 * @param {string} key
 */
arch.storage.user.buildings.addFinished = function(key) {
	var keys = arch.storage.user.buildings.getFinished();
	goog.array.insert(keys, key);
	arch.storage.user.buildings.setFinished(keys);
};
