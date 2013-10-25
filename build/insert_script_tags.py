#!/usr/bin/python

import sys
for line in open(sys.argv[1]):
	if '__SCRIPTS__' in line:
		for line in sys.stdin:
			print '<script src="{}"></script>'.format(line[:-1].replace('"', r'"'))
	else:
		print line[:-1]
