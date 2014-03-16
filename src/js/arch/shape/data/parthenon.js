goog.provide('arch.shape.data.parthenon');

arch.shape.data.parthenon = {
	name: 'Parthenon',
	background: {
		img: 'img/greek-background.jpg',
		repeat: true,
	},
	building: {
		displayName: 'Parthenon - Greece (500BC)',
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
