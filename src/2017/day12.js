AdventOfCode.day12 = {

	programs: [],

	process: input => {
		let programs = []
		input.split('\n').forEach(line => {
			line = line.split(' <-> ')
			programs[parseInt(line[0])] = line[1].split(', ').map(i => parseInt(i))
		})
		AdventOfCode.day12.programs = programs
	},

	group: (g, p) => {
		if (!g[p]) {
			g[p] = true
			AdventOfCode.day12.programs[p].forEach(i => AdventOfCode.day12.group(g, i))
			AdventOfCode.day12.programs[p] = false
		}
	},

	part1: input => {
		AdventOfCode.day12.process(input)
		let group0 = {}
		AdventOfCode.day12.group(group0, 0)
		return Object.keys(group0).length
	},
	
	part2: input => {
		AdventOfCode.day12.process(input)
		let groupId = 0
		let groups = {}
		do {
			groupId = AdventOfCode.day12.programs.map(p => p ? true : false).indexOf(true)
			groups[groupId] = {}
			AdventOfCode.day12.group(groups[groupId], groupId)
		} while (AdventOfCode.day12.programs.filter(p => p).length)
		return Object.keys(groups).length

	}

}