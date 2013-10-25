goog.provide('arch.dom');

goog.require('arch.math.Point')

/**
 * @param {!jQuery} dom
 * @return {arch.math.Point}
 */
arch.dom.getPosition = function(dom) {
	var offset = dom.offset();
	return {
		x: offset['left'],
		y: offset['top']
	};
};

/**
 * @param {!jQuery} dom
 * @param {arch.math.Point}
 */
arch.dom.setPosition = function(dom, position) {
	dom.offset({'left':position.x, 'top':position.y});
};

