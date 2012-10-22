#############################################################
# Matt Green
# 9/28/2012
# Rackspace Question 4
#
# Tested on Python 2.7.3
#
# Some Notes:
# Strings in Python are immutable objects
# and are not really meant to be manipulated in
# the way this question asks. In order to get
# around this limitation, this program reads in
# the string then converts it to a list of
# characters in order to treat it like a C style
# string. This includes adding a string escape
# character ('\0') to the end of the string.
#
#############################################################

import sys


def main():

	# make sure a file is specified
	if (len(sys.argv) != 2):
		print >> sys.stderr, "Please specify and input file!"
		return -1


	# try to open the file and exit if file doesn't exist
	f = None
	try:
		f = open(sys.argv[1], 'r')
	except IOError:
		print "Unable to open file " + sys.argv[1] 
		return -1

	# Read in file line by line and process each entry
	for line in f:
		string = []

		for c in line.strip():
			string.append(c)

		# add null terminator
		string.append('\0')

		manipulate_string_in_place(string)

# inputs:
# s: assumed to be a list of strings that simulates a C
#			style string including an ending escape character
def manipulate_string_in_place(s):

	# first pass over string: replace duplicate characters with
	# white space even if white space already separates duplicate
	# characters
	i = 0
	while s[i] != '\0':
		j=i+1

		while s[i] == s[j] or s[j] == ' ':
			s[j] = ' '
			j+=1
		
		i = j

	# second pass: eliminate whitespace by moving all characters forward
	i = 0
	j = 0
	while s[i] != '\0':
		if s[i] != ' ':
			i+=1
			continue

		j=i
		while s[j] == ' ':
			j+=1

		s[i] = s[j]

		if s[j] == '\0':
			s[j] = ' '
			break

		s[j] = ' '

	# print out string
	i = 0
	while s[i] != '\0':
		sys.stdout.write(s[i])
		i+=1
	print


if __name__ == "__main__":
	sys.exit(main())





