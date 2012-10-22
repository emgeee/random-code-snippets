#######################################
# Matt Green
# 9/28/2012
# Rackspace Question 5
#
# Tested on Python 2.7.3
#######################################

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

	matrix = []
	
	# to simplify the recursive logic, we pad the edge of the matrix
	# with a stop character that signify nodes have already been visited
	stop_character = "*"

	for line in f:
		matrix.append([stop_character] + line.strip().split() + [stop_character] )
	
	# add top and bottom rows of padding
	matrix.insert(0, [stop_character]*len(matrix[0]))
	matrix.append([stop_character]*len(matrix[0]))

	traverse_matrix(matrix,1,1,0, stop_character)


# recursive method for traversing matrix
# inputs: 
#	matrix; nxm matrix (list of list) that's been padded by stop_char
#	i: beginning row (should be 1)
#	j: beginning column (should be 1)
#	direction: which direction should you go (should always be 0
#	stop_char: the character that designates an unvisitable place
#
def traverse_matrix(matrix, i, j, direction, stop_char):
	
	rows = len(matrix)
	cols = len(matrix[0])

	i_next = i
	j_next = j

	# Logic is similar for each case but is slightly different
	# depending on the direction
	if direction == 0: # Moving left
		if matrix[i][j+1] == stop_char: # check if next spot is visitable
			direction = (direction+1) % 4 # if not, change direction
		else:
			j_next = j+1	# decide where to move next

			# visit current spot
			sys.stdout.write(matrix[i][j] + ' ')
			matrix[i][j] = "*"

	elif direction == 1: # moving down
		if matrix[i+1][j] == stop_char:
			direction = (direction+1) % 4
		else:
			i_next = i+1
			sys.stdout.write(matrix[i][j] + ' ')
			matrix[i][j] = "*"

	elif direction == 2: # moving right
		if matrix[i][j-1] == stop_char:
			direction = (direction+1) % 4
		else:
			j_next = j-1
			sys.stdout.write(matrix[i][j] + ' ')
			matrix[i][j] = "*"

	elif direction == 3: # moving up
		if matrix[i-1][j] == stop_char:
			direction = (direction+1) % 4
		else:
			i_next = i-1
			sys.stdout.write(matrix[i][j] + ' ')
			matrix[i][j] = "*"

	
	# Base case!
	# if there's no where else to move, return
	if matrix[i+1][j] == stop_char and \
		matrix[i-1][j] == stop_char and \
		matrix[i][j+1] == stop_char and \
		matrix[i][j-1] == stop_char:

		sys.stdout.write(matrix[i][j] + '\n')
		return

	# recurse!
	traverse_matrix(matrix, i_next, j_next, direction, stop_char)


# Main entry point for program
if __name__ == "__main__":
	sys.exit(main())


