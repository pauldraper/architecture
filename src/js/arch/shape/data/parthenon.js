goog.provide('arch.shape.data.parthenon');

arch.shape.data.parthenon = {
	background: {
		img: 'asda',
		size: {w:400, h:500},
	},
	building: {
		displayName: 'Parthenon',
		shapes: [
			'roof',
			'column',
			'column',
			'column',
		],
	},
	connections: [
		[
			{
				shape: 'roof',
				position: {x:1/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:0}
			},
		], [
			{
				shape: 'roof',
				position: {x:2/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:0}
			},
		], [
			{
				shape: 'roof',
				position: {x:3/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:0}
			},
		], [
			{
				shape: null,
				position: {x:1/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:1}
			},
		], [
			{
				shape: null,
				position: {x:2/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:1}
			},
		], [
			{
				shape: null,
				position: {x:3/4, y:1}
			}, {
				shape: 'column',
				position: {x:1/2, y:1}
			},
		],
	],
	shapes: {
		'column': {
			img: 'img/column.png',
			size: {w:150, h:197},
		},
		'roof': {
			img: 'img/roof.png',
			size: {w:400, h:150},
		},
	},
};
