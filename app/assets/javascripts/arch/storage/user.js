goog.provide('arch.storage.user');

goog.require('arch.lazy');
goog.require('goog.storage.Storage');
goog.require('goog.storage.mechanism.HTML5LocalStorage');

/**
 * @return {!goog.storage.Storage}
 */
arch.storage.user = arch.lazy(function() {
	return new goog.storage.Storage(new goog.storage.mechanism.HTML5LocalStorage);
});

arch.storage.user.messages = {};

/**
 * @return {boolean}
 */
arch.storage.user.messages.hasShownIntro = function() {
	return /** @type {boolean|undefined} */(arch.storage.user().get('has_shown_intro')) || false;
};

arch.storage.user.messages.setShownIntro = function() {
	arch.storage.user().set('has_shown_intro', true);
};

arch.storage.user.buildings = {};

/**
 * @return {!Array.<string>}
 */
arch.storage.user.buildings.getFinished = function() {
	return /** @type {Array.<string>|undefined} */(arch.storage.user().get('buildings_finished')) || [];
};

/**
 * @param {!Array.<string>} keys
 */
arch.storage.user.buildings.setFinished = function(keys) {
	return arch.storage.user().set('buildings_finished', keys);
};

/**
 * @param {string} key
 * @return {boolean}
 */
arch.storage.user.buildings.isFinished = function(key) {
	return goog.array.contains(arch.storage.user.buildings.getFinished(), key);
};

/**
 * @param {string} key
 */
arch.storage.user.buildings.addFinished = function(key) {
	var keys = arch.storage.user.buildings.getFinished();
	goog.array.insert(keys, key);
	arch.storage.user.buildings.setFinished(keys);
};
