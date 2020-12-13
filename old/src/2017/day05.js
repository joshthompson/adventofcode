AdventOfCode.day05 = {

	part1: input => {
		let cmds = input.split('\n').map(i => parseInt(i))
		let pos = 0
		let steps = 0
		while (pos < cmds.length) {
			cmds[pos]++
			pos += cmds[pos] - 1
			steps++
		}
		return steps
	},
	
	part2: input => {
		let cmds = input.split('\n').map(i => parseInt(i))
		let pos = 0
		let steps = 0
		while (pos < cmds.length) {
			let cpos = pos
			pos += cmds[cpos]
			cmds[cpos] += cmds[cpos] >= 3 ? -1 : 1
			steps++
		}
		return steps
	}

}