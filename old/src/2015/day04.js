AdventOfCode.day04 = {

	slowWarning: true,

	process: (input, start) => {
		let hash = ''
		let i = 0
		do hash = md5(input + i++)
		while (hash.substr(0, start.length) !== start)
		return i - 1
	},

	part1: input => AdventOfCode.day04.process(input, '00000'),
	part2: input => AdventOfCode.day04.process(input, '000000')

}
