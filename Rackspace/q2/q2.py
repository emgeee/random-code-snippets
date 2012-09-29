#############################################################
# Matt Green
# 9/28/2012
# Rackspace Question 2
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


	line_length = f.readline().strip()

	# make sure the line length given is alpha numeric
	if line_length.isalnum():
		line_length = int(line_length)
	else:
		print "No line length given"
		return -1

	text = f.readline().strip().split()

	lines = []
	line = ""

	# divide the words up into lines of appropriate length
	while len(text) > 0:
		if len(text[0]) > line_length:
			print "The specified column width is too short!"
			print "Dying...."
			return -1

		if len(line) + len(text[0]) <= line_length:
			line += text[0] + " "
			text.pop(0)
		else:
			lines.append(line.strip())
			line = ""


	justified_text = ""
	# iterate over all the lines and insert appropriate padding
	for l in lines:

		# Calculate how many spaces we need to add in
		padding = line_length - len(l)
		
		# Split words again so we can add spaces
		split_line = l.split()

		if len(split_line) > 1:
			# this index is used to distribute the
			# remaining spaces equally between all words
			k = 0
			for i in range(padding):
				split_line[k%(len(split_line) - 1)] += " "
				k+=1
		else:
			# If one one word can fit, add all padding after it
			split_line[0] += " "*padding

		# rejoin the split words and append them to our
		# justified text with a newline
		justified_text += " ".join(split_line) + "\n"


	# append the final line
	justified_text += line.strip()
	print justified_text

if __name__ == "__main__":
	sys.exit(main())
