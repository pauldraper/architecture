#!/usr/bin/python3
import sys
import os

def bricks(a, b, direction):
	lines = []
	lines.append('<?xml version="1.0"?>')
	lines.append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {0} {0}">'.format(b))
	if direction == 1:
		lines.append('\t<g>')
	else:
		lines.append('\t<g transform="translate({}, 0) scale(-1,1)">'.format(b))
	lines.append('\t\t<path d="M 0 0 v {0} {1}h {0}{2} Z" fill="#c7724a"/>'.format(
		b - a - 1,
		'v 1 h 1 ' * (a + 1),
		'v -1 h -1 ' * (b + 1)
	))
	lines.append('\t</g>')
	lines.append('</svg>')
	return '\n'.join(lines)

def limestone(a, b, direction):
	lines = []
	lines.append('<?xml version="1.0"?>')
	lines.append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 {0} {0}">'.format(b - 1))
	if direction == 1:
		lines.append('\t<g>')
	else:
		lines.append('\t<g transform="translate({}, 0) scale(-1,1)">'.format(b - 1))
	lines.append('\t\t<path d="M 0 0 v {0} {1}h {0} Z" fill="#f5f5f5" stroke="#000000" vector-effect="non-scaling-stroke"/>'.format(
		b - a - 1,
		'v 1 h 1 ' * a
	))
	lines.append('\t</g>')
	lines.append('</svg>')
	return '\n'.join(lines) + '\n'

for a in range(0, 50, 5):
	b = a + 5
	with open(os.path.join(sys.argv[1], 'bricks-{}-{}-a.svg'.format(a, b)), 'w') as f:
		f.write(bricks(a, b, 1))
	with open(os.path.join(sys.argv[1], 'bricks-{}-{}-b.svg'.format(a, b)), 'w') as f:
		f.write(bricks(a, b, -1))

a, b = b, b + 1
with open(os.path.join(sys.argv[1], 'limestone-a.svg'.format(a, b)), 'w') as f:
	f.write(limestone(a, b, 1))
with open(os.path.join(sys.argv[1], 'limestone-b.svg'.format(a, b)), 'w') as f:
	f.write(limestone(a, b, -1))
